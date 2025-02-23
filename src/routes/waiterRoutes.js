const express = require('express');
const router = express.Router();
const waiterController = require('../controllers/waiterController');
const authMiddleware = require('../config/authMiddleware');
const roleMiddleware = require('../config/roleMiddleware');

router.use(authMiddleware);
router.use(roleMiddleware(['waiter']));

router.get('/orders', waiterController.getOrders);
router.get('/recommendations', waiterController.getRecommendations);

module.exports = router;
