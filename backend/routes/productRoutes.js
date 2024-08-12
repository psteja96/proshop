import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../Modals/productModel.js";
//import products from "../data/products.js";
const router=express.Router();
import {getProducts,getProductById} from "../controllers/productController.js";

router.route('/').get(getProducts);

router.route('/:id').get(getProductById);


export default router;
