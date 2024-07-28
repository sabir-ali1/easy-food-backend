const Address = require("../moudels/address");

// Add to address
const addtoAddress = async (req, res) => {
    try {
        const { name, phone, city, state, country, pincode, address, items } = req.body; // Assuming items contain cart data

        const createAddress = await Address.create({
            userId: req.user,
            name,
            phone,
            city,
            state,
            country,
            pincode,
            address,
            items
        });

       
        return res.status(200).json({ message: "address added successfull", createAddress });

    } catch (error) {
        console.log("Error from add address", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//get user addres from data base
const getUserAddress = async (req, res) => {
    try {
        const userId = req.user;
        const userAddress = await Address.find({ userId }).sort({createdAt:-1});
        if(!userAddress){
            return res.status(404).json({message: "No address found" })
        }
        return res.status(200).json({ message: "User address", userAddress });
    } catch (error) {
        console.log("error from get user address",error);
    }
}

module.exports = { addtoAddress,getUserAddress };
