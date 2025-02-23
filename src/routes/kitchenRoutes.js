const express = require('express');
const router = express.Router();
const kitchenController = require('../controllers/kitchenController');
const authMiddleware = require('../config/authMiddleware');
const roleMiddleware = require('../config/roleMiddleware');

router.use(authMiddleware);
router.use(roleMiddleware(['kitchen']));

router.get('/orders', kitchenController.getKitchenOrders);
router.put('/order/:orderId/mark-complete', kitchenController.markOrderComplete);

module.exports = router;
