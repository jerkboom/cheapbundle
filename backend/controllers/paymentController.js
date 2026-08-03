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

        // Determine unique customer email
        const userEmail = req.user?.email;
        let customerEmail = userEmail || email;
        
        // Replace hardcoded static emails with deterministic tracking email
        if (!customerEmail || customerEmail === 'guest@bundlehub.com' || customerEmail === 'no-reply@cheapbundlehub.com' || customerEmail.startsWith('guest-')) {
            const cleanPhone = phone.replace(/\D/g, "");
            customerEmail = `${cleanPhone}@bundle-hub.com`;
        }

        console.log("========== PAYSTACK INITIALIZE ==========");
        console.log({
            email: customerEmail,
            reference,
            amount,
            network
        });

        // Map BundleHub network names to Paystack provider codes
        let provider;
        const normalizedNetwork = network.toLowerCase();
        if (normalizedNetwork === 'mtn') provider = 'mtn';
        else if (normalizedNetwork === 'telecel' || normalizedNetwork === 'vodafone') provider = 'vod';
        else if (normalizedNetwork === 'airteltigo') provider = 'tgo';

        console.time('Paystack API Initialization');
        const response = await paystack.post('/transaction/initialize', {
            email: customerEmail,
            amount: Math.round(amount * 100),
            currency: 'GHS',
            reference,
            callback_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment/callback`,
            channels: ["mobile_money"], // STRICTLY Mobile Money to enable instant prompt bypass
            mobile_money: provider ? {
                phone: phone,
                provider: provider
            } : undefined,
            metadata: {
                phone,
                network,
                bundleName,
                category,
                validity,
                deliveryType
            }
        });
        console.timeEnd('Paystack API Initialization');

        const deliveryEstimatedTime = deliveryType === 'standard' ? 'Few minutes' : '10-60 sec';

        console.time('Database Order Save');
        const order = await Order.create({
            phone,
            email: customerEmail,
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
        console.timeEnd('Database Order Save');

        console.log("Saved Order", order.paystackReference);

        res.json({ 
            authorization_url: response.data.data.authorization_url, 
            reference 
        });
    } catch (error) {
        console.error("========== PAYMENT INITIALIZATION ERROR ==========");
        console.error("Message:", error.message);
        if (error.response && error.response.data) {
            console.error("Paystack API Status:", error.response.status);
            console.error("Paystack API Response:", JSON.stringify(error.response.data, null, 2));
            console.error("Request Payload:", error.config?.data);
        } else {
            console.error("Stack Trace:", error.stack);
        }
        res.status(500).json({ 
            message: 'Failed to initialize payment',
            error: error.response?.data?.message || error.message 
        });
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
    try {
        const secret = process.env.PAYSTACK_SECRET_KEY;
        // Use rawBody saved by express.json middleware for accurate signature verification
        const bodyStr = req.rawBody ? req.rawBody.toString('utf8') : JSON.stringify(req.body);
        const hash = crypto.createHmac('sha512', secret).update(bodyStr).digest('hex');

        if (hash === req.headers['x-paystack-signature']) {
            // req.body is already parsed into an object by express.json()
            const event = typeof req.body === 'object' ? req.body : JSON.parse(bodyStr);
            if (event.event === 'charge.success') {
                const reference = event.data.reference;
                const order = await Order.findOne({ paystackReference: reference });
                if (order && order.paymentStatus !== 'paid') {
                    order.paymentStatus = 'paid';
                    order.status = 'processing';
                    order.paidAt = new Date();
                    await order.save();
                    
                    console.log(`Order ${reference} updated to paid via webhook. Sending WhatsApp...`);
                    
                    // Send WhatsApp Order Confirmation
                    whatsappService.sendOrderConfirmation(order).then(response => {
                        console.log("WhatsApp Notification Dispatched");
                    }).catch(err => {
                        console.error("WhatsApp notification failed:", err.message);
                    });
                }
            }
        } else {
            console.warn("Paystack signature verification failed.");
        }
        res.sendStatus(200);
    } catch (error) {
        console.error("Webhook processing error:", error.stack);
        res.sendStatus(400);
    }
};
