const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');

// Đảm bảo rằng route POST '/create/:id' truyền hàm callback createOrder
router.post('/create/:id', OrderController.createOrder);

// Các route khác tương tự
router.get('/get-all-order/:id', OrderController.getAllOrderDetails);
router.get('/get-details-order/:id', OrderController.getDetailsOrder);
router.delete('/cancel-order/:id', OrderController.cancelOrderDetails);
router.get('/get-all-order', OrderController.getAllOrder);

module.exports = router;