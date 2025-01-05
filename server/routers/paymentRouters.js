const express = require('express');
const router = express.Router();
const { processPayment, sendStripeApi } = require('../controllers/paymentControllers');
const { isAuthenticateUser } = require('../middlewares/authenticate');

router.post('/processpayment', isAuthenticateUser, processPayment);
router.get('/stripeapi', isAuthenticateUser, sendStripeApi);

module.exports = router;
