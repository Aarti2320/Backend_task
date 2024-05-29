const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.get('/', itemController.getItems);
router.get('/:id', itemController.getItem);
router.post('/', authMiddleware.authenticate, roleMiddleware.isAdmin, itemController.createItem);
router.put('/:id', authMiddleware.authenticate, roleMiddleware.isOwnerOrAdmin, itemController.updateItem);
router.delete('/:id', authMiddleware.authenticate, roleMiddleware.isOwnerOrAdmin, itemController.deleteItem);

module.exports = router;
