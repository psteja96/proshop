import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "./Slices/apiSlice.js";
import cartSliceReducer from "./Slices/cartSlice.js";
import authSliceReducer from "./Slices/authSlice.js";


const store=configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        cart:cartSliceReducer,
        auth:authSliceReducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})

export default store;
