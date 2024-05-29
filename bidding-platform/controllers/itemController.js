const Item = require('../models/item');
const { Op } = require('sequelize');

exports.getItems = async (req, res) => {
    const { page = 1, limit = 10, search = '', status } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (search) {
        where.name = { [Op.iLike]: `%${search}%` };
    }
    if (status) {
        if (status === 'active') {
            where.end_time = { [Op.gt]: new Date() };
        } else if (status === 'ended') {
            where.end_time = { [Op.lte]: new Date() };
        }
    }

    try {
        const items = await Item.findAndCountAll({
            where,
            limit,
            offset,
            order: [['created_at', 'DESC']],
        });
        res.json({
            totalItems: items.count,
            items: items.rows,
            totalPages: Math.ceil(items.count / limit),
            currentPage: page,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getItem = async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id);
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createItem = async (req, res) => {
    const { name, description, starting_price, end_time } = req.body;
    const imageUrl = req.file ? req.file.path : null;
    try {
        const item = await Item.create({ name, description, starting_price, current_price: starting_price, image_url: imageUrl, end_time });
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateItem = async (req, res) => {
    const { name, description, starting_price, end_time } = req.body;
    const imageUrl = req.file ? req.file.path : null;
    try {
        const item = await Item.findByPk(req.params.id);
        if (!item) return res.status(404).json({ error: 'Item not found' });

        await item.update({ name, description, starting_price, end_time, image_url: imageUrl || item.image_url });
        res.json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id);
        if (!item) return res.status(404).json({ error: 'Item not found' });

        await item.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
