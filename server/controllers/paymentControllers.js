const catchAsyncError = require('../middlewares/catchAsyncError');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const processPayment = catchAsyncError(async (req, res, next) => {
    const { amount, shipping } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        description: "TEST PAYMENT",
        metadata: { integration_check: "accept_payment" },
        shipping
    });

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    });
});

const sendStripeApi = catchAsyncError(async (req, res, next) => {
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    });
});

module.exports = {
    processPayment,
    sendStripeApi
};
