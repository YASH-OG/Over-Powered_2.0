const express = require('express');
const router = express.Router();
const gamificationController = require('../controllers/gamificationController');
const authMiddleware = require('../config/authMiddleware');

router.get('/discounts', gamificationController.getDiscounts);
router.get('/rewards', gamificationController.getRewards);
router.post('/rewards/claim', authMiddleware, gamificationController.claimReward);

module.exports = router;
