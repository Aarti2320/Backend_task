const Notification = require('../models/notification');

exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.findAll({ where: { user_id: req.user.id } });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findByPk(req.params.id);
        if (!notification) return res.status(404).json({ error: 'Notification not found' });

        await notification.update({ is_read: true });
        res.json(notification);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
