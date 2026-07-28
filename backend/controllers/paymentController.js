const Order = require('../models/Order');
const Bundle = require('../models/Bundle');
const paystack = require('../utils/paystack');
const crypto = require('crypto');
const mongoose = require('mongoose');

exports.initializePayment = async (req, res) => {
    const { network, bundleName, price, deliveryType, category, validity, phone, email } = req.body;
    try {
        if (!process.env.PAYSTACK_SECRET_KEY) {
            throw new Error("PAYSTACK_SECRET_KEY is not defined in environment variables");
        }
        if (mongoose.connection.readyState !== 1) {
            throw new Error("MongoDB is not connected");
        }

        if (!network || !bundleName || !price || !category || !phone) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const amount = Number(price);
        const reference = `CBHG-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;

        console.log("Creating Order", req.body);

        const response = await paystack.post('/transaction/initialize', {
            email: email || 'no-reply@cheapbundlehub.com',
            amount: Math.round(amount * 100),
            reference,
            callback_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment/callback`,
            metadata: {
                phone,
                network,
                bundleName,
                category,
                validity,
                deliveryType
            }
        });

        const deliveryEstimatedTime = deliveryType === 'standard' ? 'Few minutes' : '10-60 sec';

        const order = await Order.create({
            phone,
            email,
            network,
            bundleName,
            category,
            validity,
            amount,
            deliveryType,
            deliveryPrice: amount,
            deliveryEstimatedTime,
            paystackReference: reference,
            paymentStatus: 'pending',
            status: 'pending'
        });

        console.log("Saved Order", order);

        res.json({ 
            authorization_url: response.data.data.authorization_url, 
            reference 
        });
    } catch (error) {
        console.error("Error in initializePayment:", error);
        if (error.response && error.response.data) {
            console.error("Paystack API Error Response:", error.response.data);
        }
        res.status(500).json({ message: error.message || 'Internal server error', stack: error.stack });
    }
};

exports.verifyPayment = async (req, res) => {
    const { reference } = req.params;
    try {
        const response = await paystack.get(`/transaction/verify/${reference}`);
        const paystackData = response.data.data;
        
        if (response.data.status === true && paystackData.status === 'success') {
            const order = await Order.findOne({ paystackReference: reference });
            if (order && order.paymentStatus !== 'paid') {
                order.paymentStatus = 'paid';
                order.status = 'processing';
                order.paidAt = new Date();
                await order.save();
            }
            console.log("Verified Order", order);
            res.json({ success: true, order });
        } else {
            const order = await Order.findOne({ paystackReference: reference });
            if (order && order.paymentStatus !== 'paid') {
                order.paymentStatus = 'failed';
                order.status = 'failed';
                await order.save();
            }
            res.status(400).json({ success: false, message: 'Payment verification failed' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.paystackWebhook = async (req, res) => {
    try {
        const secret = process.env.PAYSTACK_SECRET_KEY;
        const bodyStr = req.body.toString('utf8');
        const hash = crypto.createHmac('sha512', secret).update(bodyStr).digest('hex');

        if (hash === req.headers['x-paystack-signature']) {
            const event = JSON.parse(bodyStr);
            if (event.event === 'charge.success') {
                const reference = event.data.reference;
                const order = await Order.findOne({ paystackReference: reference });
                if (order && order.paymentStatus !== 'paid') {
                    order.paymentStatus = 'paid';
                    order.status = 'processing';
                    order.paidAt = new Date();
                    await order.save();
                }
            }
        }
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(400);
    }
};
