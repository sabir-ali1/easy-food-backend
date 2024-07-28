const Product = require("../moudels/product");


//product add to backend 
const addProduct = async (req,res) => {
    try {
        const { title,description,price,catogery,qty,img} = req.body;

        const productAdd = await Product.create({title,description,price,catogery,qty,img});

        return res.status(200).json({message:"product added successfull",productAdd});

    } catch (error) {
        console.log("error from add to product",error);
    }
}

//get all product from a backend
const getProduct = async (req,res) => {
    try {
        const product = await Product.find();
        if(!product){
            return res.status(401).json({message:"product is not available"});
        }else{
            return res.status(200).json(product);
        }
    } catch (error) {
        console.log("error from get product",error);
    }
}

//get produt by id from backend
const singleProduct = async (req,res) => {
    try {
        const id = req.params.id

        const product = await Product.findById(id);

        if(!product){
            return res.status(401).json({message:"product is not available"});
        }

        return res.status(200).json({message:product});

    } catch (error) {
        console.log("error from single product",error);
    }
}

module.exports = {addProduct,getProduct,singleProduct}