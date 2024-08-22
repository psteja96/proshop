import {apiSlice} from "./apiSlice.js";
import {ORDERS_API} from "../constants.js";


export const ordersApiSlice=apiSlice.injectEndpoints({
    endpoints: builder => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_API,
                method: 'POST',
                body: {...order}
            }),
        }),
    }),
});

export const {useCreateOrderMutation}=ordersApiSlice;
