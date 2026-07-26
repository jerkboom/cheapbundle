const mongoose = require('mongoose');

const bundleSchema = new mongoose.Schema({
    network: {
        type: String,
        required: true,
        enum: ['MTN', 'Telecel', 'AirtelTigo']
    },
    name: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Bundle', bundleSchema);
