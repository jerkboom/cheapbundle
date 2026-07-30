const axios = require('axios');

const sendWhatsAppMessage = async (to, body, type = 'notification') => {
    try {
        const instanceId = process.env.ULTRAMSG_INSTANCE_ID;
        const token = process.env.ULTRAMSG_TOKEN;
        const baseUrl = process.env.ULTRAMSG_BASE_URL || 'https://api.ultramsg.com';

        if (!instanceId || !token || instanceId === 'YOUR_INSTANCE_ID') {
            console.log(`[WhatsApp - ${type}] API not configured. Skipping message to ${to}`);
            return null;
        }

        // Ensure instanceId starts with 'instance' as required by UltraMsg
        const formattedInstanceId = instanceId.startsWith('instance') ? instanceId : `instance${instanceId}`;
        
        // Construct URL safely (if user pasted the full URL into BASE_URL by accident)
        let cleanBaseUrl = baseUrl.replace(/\/$/, ''); // remove trailing slash
        let url;
        if (cleanBaseUrl.endsWith(formattedInstanceId)) {
            url = `${cleanBaseUrl}/messages/chat`;
        } else {
            url = `${cleanBaseUrl}/${formattedInstanceId}/messages/chat`;
        }
        
        // Format phone number to international format for Ghana
        let formattedPhone = to.replace(/\s+/g, '');
        if (formattedPhone.startsWith('0')) {
            formattedPhone = '233' + formattedPhone.substring(1);
        } else if (formattedPhone.startsWith('+')) {
            formattedPhone = formattedPhone.substring(1);
        }

        const data = {
            token: token,
            to: formattedPhone,
            body: body
        };

        const response = await axios.post(url, data);
        console.log(`[WhatsApp - ${type}] Successfully sent to ${formattedPhone} at ${new Date().toISOString()}`);
        return response.data;
    } catch (error) {
        console.error(`[WhatsApp - ${type}] Error sending to ${to} at ${new Date().toISOString()}:`, error.message);
        if (error.response && error.response.data) {
            console.error(`[WhatsApp - ${type}] UltraMsg API Error Response:`, error.response.data);
        }
        return null;
    }
};

const sendOrderConfirmation = async (order) => {
    // Assuming we don't have the user's first name, we'll just greet them.
    const message = `🎉 Payment Successful!\n\nHi there,\n\nYour ${order.network} ${order.bundleName} bundle has been purchased successfully.\n\n💳 Amount: GHS ${order.amount.toFixed(2)}\n📦 Delivery: ${order.deliveryType === 'instant' ? 'Instant' : 'Standard'}\n🆔 Order: ${order.paystackReference}\n\nWe'll notify you once your bundle has been delivered.\n\nThank you for choosing BundleHub.`;
    return sendWhatsAppMessage(order.phone, message, 'Order Confirmation');
};

const sendOrderFailed = async (order) => {
    const message = `❌ Payment Failed\n\nHi there,\n\nYour payment for ${order.network} ${order.bundleName} bundle could not be verified or was declined.\n\n💳 Amount: GHS ${order.amount.toFixed(2)}\n🆔 Order: ${order.paystackReference}\n\nPlease try again or contact support if you were debited.\n\nThank you for choosing BundleHub.`;
    return sendWhatsAppMessage(order.phone, message, 'Order Failed');
};

const sendOrderDelivered = async (order) => {
    const message = `✅ Bundle Delivered\n\nYour ${order.network} ${order.bundleName} bundle has been successfully delivered.\n\nThank you for choosing BundleHub.\n\nNeed another bundle?\nhttps://bundle-hub.com`;
    return sendWhatsAppMessage(order.phone, message, 'Order Delivered');
};

module.exports = {
    sendWhatsAppMessage,
    sendOrderConfirmation,
    sendOrderFailed,
    sendOrderDelivered
};
