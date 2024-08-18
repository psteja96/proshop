import {apiSlice} from "./apiSlice.js";
import { USERS_API} from "../constants.js";


export const usersApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(data) =>({
                url:`${USERS_API}/auth`,
                method:'POST',
                body:data
            }),

        }),
        register:builder.mutation({
            query:(data) =>({
                url:`${USERS_API}`,
                method:'POST',
                body:data
            }),

        }),
        logout:builder.mutation({
            query:() =>({
                url:`${USERS_API}/logout`,
                method:'POST',
            }),

        }),


    })
})

export const {useLoginMutation,useLogoutMutation,useRegisterMutation}=usersApiSlice;
