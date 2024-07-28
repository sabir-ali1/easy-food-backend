const OrderConfirmation = require('../moudels/orderConfirm'); // Adjust the path as needed

// Create a new order
const createOrder = async (req, res) => {
    try {
        const {
            userId, items, name, phone, city, state, country, pincode, address
        } = req.body;

        const newOrder = new OrderConfirmation({
            userId,
            items,
            name,
            phone,
            city,
            state,
            country,
            pincode,
            address
        });

        const savedOrder = await newOrder.save();
        res.status(201).json({message:"order successfull",
            data: savedOrder
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

module.exports = {createOrder}

