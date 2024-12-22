const express = require('express');
const router = express.Router();
const cafeController = require('../controllers/cafeController');
const { authenticate } = require('../middleware/authMiddleware');

// Protected route to fetch cafes
router.get('/cafes', authenticate, cafeController.getCafes);

module.exports = router;