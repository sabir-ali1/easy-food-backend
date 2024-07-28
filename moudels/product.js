const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    catogery:{type:String,required:true},
    qty:{type:Number,required:true},
    img:{type:String,required:true},
});


const Product = new mongoose.model('Product',productSchema);

module.exports = Product;