const Order = require('../models/Order');



exports.getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
};

exports.getMyOrders = async (req, res) => {
    // Basic search by phone number (if customer isn't logged in, they can track by phone)
    const { phone } = req.query;
    if (phone) {
        const orders = await Order.find({ phone: phone });
        return res.json(orders);
    }
    res.json([]);
};

exports.trackOrder = async (req, res) => {
    const { query } = req.query;
    console.log("Searching:", query);

    if (!query) {
        return res.status(400).json({ message: 'Provide reference or phone number' });
    }
    const orders = await Order.find({
        $or: [
            { paystackReference: query },
            { phone: query }
        ]
    }).sort({ createdAt: -1 });

    if (orders.length > 0) {
        console.log(orders);
    } else {
        console.log("No orders found");
    }

    res.json(orders);
};

exports.getOrders = async (req, res) => {
    const orders = await Order.find({});
    res.json(orders);
};

exports.updateOrderToDelivered = async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.status = 'completed';
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
};
