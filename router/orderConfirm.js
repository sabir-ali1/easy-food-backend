const express = require("express");
const router = express.Router();
const authMiddelware = require("../middelware/auth-middelware");
const orderController = require("../controllers/orderCinfirm")

//order router
router.route("/confirm").post(authMiddelware,orderController.createOrder);


module.exports = router;