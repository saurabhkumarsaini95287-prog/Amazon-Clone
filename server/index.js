const express = require('express');;
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require("cors");

const userRouter = require("./app/routes/userRoutes");
const orderRoutes = require("./app/routes/orderRoutes");
const productRoutes = require("./app/routes/productRoutes");

//connect to monoDb

let app=express();

app.use(express.json());

app.use(cors())

app.use("/api/user/",userRouter );
app.use("/api/order", orderRoutes);
app.use("/api/product", productRoutes);


mongoose.connect(process.env.DBURL).then(()=>{
    console.log("connected to mongodb");
    app.listen(process.env.PORT,()=>{
        console.log("server is running on 8000")
    })
})