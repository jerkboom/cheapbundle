const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        // Making it optional since frontend just asks for phone and optional email
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    network: {
        type: String,
        required: true
    },
    bundleName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paystackReference: {
        type: String,
        required: true,
        unique: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'failed'],
        default: 'pending'
    },
    paidAt: {
        type: Date
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
