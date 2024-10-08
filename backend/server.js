import express, {urlencoded} from 'express';
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import {errorHandler, notFound} from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
dotenv.config();
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept',
        'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization','Access-Control-Allow-Origin'],
    credentials: true}


const port=5001;
connectDB();
const app=express();
//Body Parser Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.urlencoded({extended:true}));
 app.use(cors(corsOptions));
app.get('/',(req,res)=>{
    res.send('API is running....');
});


app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port,()=>{
    console.log('Server running on 5001');
});

