const express = require('express');
const router = express.Router();
const bidController = require('../controllers/bidController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware.authenticate, bidController.placeBid);
router.get('/', bidController.getBids);

module.exports = router;
