import {apiSlice} from "./apiSlice.js";
import {Product_API} from "../constants.js";


export const productsApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getProducts:builder.query({
            query:() =>({
                url:Product_API
            }),
            keepUnusedDataFor:5
        }),

        getProductDetails:builder.query({
            query:(productId) =>({
                url:`${Product_API}/${productId}`
            }),
            keepUnusedDataFor:2
        })
    })
})


export const {useGetProductsQuery,useGetProductDetailsQuery}=productsApiSlice;
