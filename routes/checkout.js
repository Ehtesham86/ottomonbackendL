const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Checkout = require('../models/checkout');
const stripe = require('stripe')('pk_test_51OU7K2GzmgnXQM1ZzsvV9RUUBFbRKzol5julcMWC8zV8ckijoKAHbr1kBB2cwqbJuKN4kkxdomxe1fhpbNjkLDNm00DHUrBE3P'); // Replace with your Stripe secret key

router.post('/', async (req, res) => {
    const { firstName, lastName, phone, email, address, time, total, city, country, cartItems, type, paymentMethodId } = req.body;

    try {
        // Create a new Checkout document
        const newCheckout = new Checkout({
            _id: new mongoose.Types.ObjectId(),
            firstName,
            lastName,
            phone,
            email,
            address,
            time,
            total,
            city,
            country,
            cartItems,
            type,
            paymentMethodId,
            paymentStatus: 'pending' // Default to pending
        });

        // Save the checkout details to the database
        await newCheckout.save();

        // Create a payment intent with Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total * 100, // Convert to cents
            currency: 'usd',
            payment_method: paymentMethodId,
            confirm: true,
            error_on_requires_action: true,
        });

        // Update paymentStatus based on the outcome
        newCheckout.paymentStatus = paymentIntent.status === 'succeeded' ? 'completed' : 'failed';
        await newCheckout.save();

        res.status(200).json({ message: 'Payment processed successfully', paymentStatus: newCheckout.paymentStatus });
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ error: 'Payment processing failed', details: error.message });
    }
});

module.exports = router;
