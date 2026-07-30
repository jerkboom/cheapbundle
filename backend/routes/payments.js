const express = require('express');
const router = express.Router();
const { initializePayment, verifyPayment, paystackWebhook } = require('../controllers/paymentController');

router.post('/initialize', initializePayment);
router.get('/verify/:reference', verifyPayment);
router.post('/webhook', paystackWebhook);

// Debug endpoint
router.post('/webhook-test', (req, res) => {
    console.log("========== WEBHOOK TEST ==========");
    console.log(req.body);
    res.send("OK");
});

module.exports = router;
