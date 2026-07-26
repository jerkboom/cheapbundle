const express = require('express');
const router = express.Router();
const { addOrderItems, getOrderById, getMyOrders, getOrders, updateOrderToDelivered, trackOrder } = require('../controllers/orderController');
const { protect, seller } = require('../middlewares/authMiddleware');

router.route('/')
    .post(addOrderItems)
    .get(protect, seller, getOrders);

router.route('/track')
    .get(trackOrder);

router.route('/myorders')
    .get(getMyOrders);

router.route('/:id')
    .get(getOrderById);

router.route('/:id/deliver')
    .put(protect, seller, updateOrderToDelivered);

module.exports = router;
