const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }, // Changed to String
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
});

userSchema.methods.generateToken = async function(){
try {
    return jwt.sign({
        userId : this._id,
        email: this.email,
        isAdmin: this.isAdmin
    },
    process.env.secret_key,
    {
        expiresIn:"2d"
    }
    )
} catch (error) {
    console.log("error from jwt ",error);
}
}

const User = mongoose.model('User', userSchema);

module.exports = User;
