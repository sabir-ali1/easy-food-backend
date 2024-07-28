const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
    img: { type: String, required: true },
});

const orderConfirmationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [cartItemSchema],
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: Number, required: true },
    address: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Create a model using the schema
const OrderConfirmation = mongoose.model("OrderConfirmation", orderConfirmationSchema);

module.exports = OrderConfirmation;
