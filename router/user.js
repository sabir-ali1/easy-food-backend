const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user");
const authMiddelware = require("../middelware/auth-middelware");

//register route
router.route("/register").post(userControllers.register);

//login route
router.route("/login").post(userControllers.login);

//get user data 
router.route("/user/data").get(authMiddelware,userControllers.getUserData)


module.exports = router;