const jwt = require("jsonwebtoken");
const User = require("../moudels/user");


const authMiddelware = async (req, res,next) => {

    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Invalid token" });
    }

    const jwtToken = token.replace("Bearer", "").trim();
  

    try {
    const isVerifiyed = jwt.verify(jwtToken,process.env.secret_key);
    const userData = await User.findOne({email:isVerifiyed.email}).select({password:0})
     
    req.user = userData;
    req.token = token;
    req.userId = userData._id;

    next();
    
    } catch (error) {
        console.log("error from jwt middelware", error);
    }
}


module.exports = authMiddelware;