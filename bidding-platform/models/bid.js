const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Bid = sequelize.define('Bid', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    item_id: { type: DataTypes.INTEGER, references: { model: 'items', key: 'id' } },
    user_id: { type: DataTypes.INTEGER, references: { model: 'users', key: 'id' } },
    bid_amount: { type: DataTypes.DECIMAL, allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { timestamps: false });

module.exports = Bid;
