import mongoose from "mongoose";
import products from "./products.js";
const MONGO_URI='mongodb+srv://pstejaps:BB5LoS6NNaPc0KQh@cluster0.vwurcgm.mongodb.net/proshop?retryWrites=true&w=majority&appName=Cluster0';
import  users from  "./users.js";
import User from "../Modals/userModel.js";
import Product from  "../Modals/productModel.js";
import Order from "../Modals/orderModel.js";
import connectDB from "../config/db.js";
connectDB();

const importData=async ()=>{
   try {
       await Order.deleteMany();
       await Product.deleteMany();
        await User.deleteMany();

     const createdUsers=await  User.insertMany(users);

      const adminUser=createdUsers[0]._id;

        const sampleProducts=products.map((p)=>{
            return {...p,user:adminUser}
        })

       await Product.insertMany(sampleProducts);
        console.log("data inserted");
        process.exit();
    }catch(error) {
       console.log("Error while inserting data");
       process.exit(1);

    }
}

const destroyData=async ()=>{
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log("data deleted");
        process.exit();
    }catch(error) {
        console.log("Error while deleting data",error);
        process.exit(1);

    }
}

importData();
//destroyData();



