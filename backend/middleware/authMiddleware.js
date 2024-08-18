import asyncHandler from "./asyncHandler.js";
import jwt from "jsonwebtoken";
import User from "../Modals/userModel.js";


//Protect Routes
const protect=asyncHandler(async (req,res,next)=>{
    let token;

    //Read JWT from the cookie;
    token=req.cookies.jwt;

    if(token){
      try {
       const decoded=jwt.verify(token,process.env.JWT_SECRET);
       req.user=await User.findById(decoded.userId).select('-password');
        next();
      }catch (error){
          res.status(401);
          throw new Error('Not Authorised,token failed');
      }
    }else
    {
        res.status(401);
        throw new Error('Not Authorised,no token');
    }
});

//ADMIN MIDDLEWARE
const admin=(req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next();
    }else {
        res.status(401);
        throw new Error('Not Authorised,not admin');
    }
}

export {protect,admin};
