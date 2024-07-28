const Cart = require("../moudels/cart");

//add to cart logic start here 
const addToCart = async (req, res) => {
    try {

        const { productId, title, price, qty, img } = req.body;

        const userId = req.user;

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].qty += qty
            cart.items[itemIndex].price += price * qty
        } else {
            cart.items.push({ productId, title, price, qty, img });
        }

        await cart.save();

        return res.status(201).json({ message: "item add to cart", cart });

    } catch (error) {
        console.log("error from add to cart", error);
    }
}

//get user cart item
const getCartItem = async (req, res) => {
    try {
        const userId = req.user;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(401).json({ message: "cart not found" });
        }

        return res.status(201).json({ message: "user cart", cart });

    } catch (error) {
        console.log("error from get user cart", erro);
    }
}

//delte item from cart
const removeItem = async (req, res) => {
    try {
        const productId = req.params.productId;
        const userId = req.user;
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(401).json({ message: "product not found" });
        }

        cart.items = cart.items.filter((item) => item.productId.toString() !== productId);

        await cart.save();

        return res.status(201).json({ message: "remove item" })

    } catch (error) {
        console.log("error from remove item from cart");
    }
}

//decrease qty 
const decreaseQty = async (req, res) => {
    try {
        const { productId, qty } = req.body;
        const userId = req.user;
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId.toString());

        if (itemIndex > -1) {
            const item = cart.items[itemIndex];
            if (item.qty > qty) {
                const pricePerUnit = item.price / item.qty;
                item.qty -= qty;
                item.price -= pricePerUnit * qty;
            } else {
                cart.items.splice(itemIndex, 1);
            }
        } else {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        await cart.save();

        return res.status(200).json({ message: "Quantity decreased",cart });
    } catch (error) {
        console.log("Error from decreaseQty:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


//clear all cart
const clearCart = async (req, res) => {
    try {
        const userId = req.user;

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ item: [] });
        } else {
            cart.items = [];
        }

        await cart.save();

        return res.status(200).json({ message: "all cart remove" });

    } catch (error) {
        console.log("error from remove cart", error);
    }
}



module.exports = { addToCart, getCartItem, removeItem,decreaseQty,clearCart }
