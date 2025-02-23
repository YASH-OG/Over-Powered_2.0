const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const authMiddleware = require('../config/authMiddleware');
const roleMiddleware = require('../config/roleMiddleware');

router.use(authMiddleware);
router.use(roleMiddleware(['admin']));

router.get('/orders', analyticsController.getOrderAnalytics);
router.get('/popular-searches', analyticsController.getPopularSearches);

module.exports = router;
