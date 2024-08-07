import express from  'express';
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import {errorHandler, notFound} from "./middleware/errorMiddleware.js";

const port=5001;
connectDB();
const app=express();
app.use(cors());
app.get('/',(req,res)=>{
    res.send('API is running....');
});

app.use('/api/products',productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port,()=>{
    console.log('Server running on 5001');
});
