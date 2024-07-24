const mongoose = require('mongoose');

const CheckoutSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    phone: Number,
    email: String,
    address: String,
    time: String,
    total: Number,
    city: String,
    country: String,
    cartItems: Array,
    type: String,
    paymentMethodId: String,  // Add paymentMethodId to the schema
    paymentStatus: String     // Add paymentStatus to the schema
});

module.exports = mongoose.model('Checkout', CheckoutSchema);
