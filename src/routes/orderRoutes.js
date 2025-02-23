const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../config/authMiddleware');
const roleMiddleware = require('../config/roleMiddleware');

router.use(authMiddleware);

router.get('/', roleMiddleware(['admin', 'waiter', 'kitchen']), orderController.getOrders);
router.post('/', roleMiddleware(['waiter']), orderController.placeOrder);
router.put('/status', roleMiddleware(['waiter', 'kitchen']), orderController.updateOrderStatus);

module.exports = router;
