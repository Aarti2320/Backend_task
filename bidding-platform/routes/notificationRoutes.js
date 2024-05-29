const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware.authenticate, notificationController.getNotifications);
router.put('/:id', authMiddleware.authenticate, notificationController.markAsRead);

module.exports = router;
