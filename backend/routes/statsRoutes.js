const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getOverviewStats } = require('../controllers/statsController');

// Protected route
router.get('/overview', protect, getOverviewStats);

module.exports = router;
