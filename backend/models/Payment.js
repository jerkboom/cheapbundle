const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    reference: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true
    },
    gateway: {
        type: String,
        default: 'Paystack'
    },
    status: {
        type: String,
        enum: ['pending', 'successful', 'failed'],
        default: 'pending'
    },
    verifiedAt: {
        type: Date
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Payment', paymentSchema);
