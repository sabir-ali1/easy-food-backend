const express = require("express");
const router = express.Router();
const productController = require("../controllers/Product");
const authMiddelware = require("../middelware/auth-middelware");


//add product router
router.route("/add").post(authMiddelware,productController.addProduct);

//get product router
router.route("/get").get(productController.getProduct);

//get single product
router.route("/:id").get(productController.singleProduct);

module.exports = router;