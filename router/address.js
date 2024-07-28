const express = require("express");
const router = express.Router();
const authMiddelware = require("../middelware/auth-middelware");
const addressController = require("../controllers/address")

//add address router
router.route("/add").post(authMiddelware,addressController.addtoAddress);

//get address
router.route("/get").get(authMiddelware,addressController.getUserAddress);

module.exports = router;