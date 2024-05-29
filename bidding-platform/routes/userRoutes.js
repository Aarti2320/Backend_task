// routes/userRoutes.js
const express = require('express');
const { profile } = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/profile', authenticate, profile);

module.exports = router;
