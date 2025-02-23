const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const authMiddleware = require('../config/authMiddleware');
const roleMiddleware = require('../config/roleMiddleware');

router.get('/', menuController.getMenu);
router.get('/popular', menuController.getMenu);  // Add implementation for popular items
router.post('/', [authMiddleware, roleMiddleware(['admin'])], menuController.addMenuItem);

module.exports = router;
