const mongoose = require("mongoose");

// Define the Cart schema


// Define the Address schema
const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: Number, required: true },
    address: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Create the Address model
const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
