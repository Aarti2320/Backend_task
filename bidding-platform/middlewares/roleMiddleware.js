exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied. Admins only.' });
    }
    next();
};

exports.isOwnerOrAdmin = async (req, res, next) => {
    const item = await Item.findByPk(req.params.id);
    if (req.user.role !== 'admin' && item.user_id !== req.user.id) {
        return res.status(403).json({ error: 'Access denied. You are not the owner of this item.' });
    }
    next();
};
