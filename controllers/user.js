const User = require("../moudels/user");
const bcrypt = require("bcryptjs");

//register page logic start here
const register = async (req,res) => {
    try {
        const {name,email,phone,password} = req.body;

        //userExist 
        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(401).json({message:"email already exist"});
        }

        //hashPassword
        const saltRound = 10
        const hashPassword = await bcrypt.hash(password,saltRound);

        //userCreated 
        const userCreated = await User.create({name,email,phone,password:hashPassword});

        return res.status(200).json({message:"register successfull",token: await userCreated.generateToken(),userId:userCreated._id.toString()});

    } catch (error) {
        console.log("error from register page",error);
    }
}


//login page logic start here

const login = async (req,res) => {
    try {
        const {email,password} = req.body;

        //userExist check user register or not register
        const userExist = await User.findOne({email});
        if(!userExist){
            return res.status(401).json({message:"invalid credantials"});
        }

        //password check
        const user = await bcrypt.compare(password,userExist.password);
        if(user){
            return res.status(200).json({message:"login successfull",  token: await userExist.generateToken(),userId:userExist._id.toString()});
        }else{
            return res.status(401).json({message:"invalid credantials"});
        }

    } catch (error) {
        console.log("error from login page",error);
    }
}

// get single user data 

const getUserData = async (req,res) => {
    try {
        const data = req.user;
        return res.status(200).json(data);
    } catch (error) {
        console.log("error from get user data",error);
    }
}

module.exports =  {register,login,getUserData};