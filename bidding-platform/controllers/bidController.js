const Bid = require('../models/bid');
const Item = require('../models/item');
const NotificationService = require('../services/notificationService');
const WebSocketService = require('../services/websocketService');

exports.placeBid = async (req, res) => {
    const { itemId, bidAmount } = req.body;
    try {
        const item = await Item.findByPk(itemId);
        if (!item) return res.status(404).json({ error: 'Item not found' });

        if (bidAmount <= item.current_price) {
            return res.status(400).json({ error: 'Bid amount must be higher than current price' });
        }

        const bid = await Bid.create({
            item_id: itemId,
            user_id: req.user.id,
            bid_amount: bidAmount,
        });

        await item.update({ current_price: bidAmount });

        // Notify previous highest bidder
        const previousBids = await Bid.findAll({ where: { item_id: itemId }, order: [['bid_amount', 'DESC']], limit: 2 });
        if (previousBids.length > 1) {
            const previousHighestBid = previousBids[1];
            await NotificationService.sendNotification(previousHighestBid.user_id, `You have been outbid on item ${item.name}`);
        }

        // Notify item owner
        await NotificationService.sendNotification(item.user_id, `Your item ${item.name} has received a new bid of ${bidAmount}`);

        // Real-time update via WebSocket
        WebSocketService.notifyNewBid(itemId, bidAmount);

        res.status(201).json(bid);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBids = async (req, res) => {
    try {
        const bids = await Bid.findAll({ where: { item_id: req.params.itemId } });
        res.json(bids);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
