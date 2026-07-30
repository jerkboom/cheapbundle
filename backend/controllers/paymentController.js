const Order = require('../models/Order');
const Bundle = require('../models/Bundle');
const paystack = require('../utils/paystack');
const crypto = require('crypto');
const mongoose = require('mongoose');
const whatsappService = require('../services/whatsappService');

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
                
                // Send WhatsApp Payment Failed Notification (Fire and forget)
                whatsappService.sendOrderFailed(order).catch(err => console.error("WhatsApp notification failed:", err));
            }
            res.status(400).json({ success: false, message: 'Payment verification failed' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.paystackWebhook = async (req, res) => {
    console.log("========== WEBHOOK RECEIVED ==========");
    console.log(req.method);
    console.log(req.originalUrl);
    console.log("HEADERS:", req.headers);
    
    try {
        console.log("BODY:", req.body);
        
        // Temporarily bypassing signature verification for debugging
        const event = typeof req.body === 'object' ? req.body : JSON.parse(req.rawBody ? req.rawBody.toString('utf8') : JSON.stringify(req.body));
        
        if (event.event === 'charge.success') {
            const reference = event.data.reference;
            const order = await Order.findOne({ paystackReference: reference });
            if (order && order.paymentStatus !== 'paid') {
                order.paymentStatus = 'paid';
                order.status = 'processing';
                order.paidAt = new Date();
                await order.save();
                
                console.log("Order updated to paid via webhook. Sending WhatsApp...");
                console.log(order.phone);
                console.log(order.paystackReference);
                
                // Send WhatsApp Order Confirmation
                whatsappService.sendOrderConfirmation(order).then(response => {
                    console.log("WhatsApp API Response:", response);
                }).catch(err => {
                    console.error("WhatsApp notification failed. Stack:", err.stack);
                    if (err.response) {
                        console.error("WhatsApp Response Status:", err.response.status);
                        console.error("WhatsApp Response Data:", err.response.data);
                    }
                });
            }
        }
        res.sendStatus(200);
    } catch (error) {
        console.error("Webhook processing error:", error.stack);
        res.sendStatus(400);
    }
};
