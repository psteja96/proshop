import jwt from "jsonwebtoken";


const generateToken=(res,userId)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'1D'
    });

    //SEt JWT as HTTP ONLY Key
    res.cookie('jwt',token,{
        httpOnly:true,
        secure:false, //Set true in PROD
        sameSite:'strict',
        maxAge:30*60*24*1000
    });
}

export default generateToken;
