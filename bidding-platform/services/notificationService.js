const Notification = require('../models/notification');

exports.sendNotification = async (userId, message) => {
    try {
        const notification = await Notification.create({ user_id: userId, message });
        return notification;
    } catch (error) {
        throw new Error('Unable to send notification');
    }
};
