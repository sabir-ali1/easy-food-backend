require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./router/user");
const productRouter = require("./router/product");
const connectDb = require("./utils/db");
const cors = require("cors");
const cartRouter = require("./router/cart");
const addressRouter = require("./router/address");
const orderRouter = require("./router/orderConfirm");


const corsOption = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    Credentials : true
}

app.use(cors(corsOption));

app.use(express.json());

//user router
app.use("/api/auth",userRouter);

//product router
app.use("/api/product",productRouter);

//cart router
app.use("/api/cart",cartRouter);

//address router
app.use("/api/address",addressRouter);

//order router
app.use("/api/order",orderRouter)




app.get("/",(req,res)=>{
    res.send("Hello World");
});


const port = 5000;

connectDb().then(()=>{
    app.listen(port,()=>{
        console.log(`server is running on http://localhost:${port}`);
    });
})