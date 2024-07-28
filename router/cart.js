const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");
const authMiddelware = require("../middelware/auth-middelware");

//add to cart route
router.route("/add").post(authMiddelware,cartController.addToCart);

//get cart item
router.route("/get").get(authMiddelware,cartController.getCartItem);

//delete cart item;
router.route("/remove/:productId").delete(authMiddelware,cartController.removeItem);

//clear all cart
router.route("/clear").delete(authMiddelware,cartController.clearCart);

//decrase qty
router.route("/--qty").post(authMiddelware,cartController.decreaseQty);

module.exports = router
