import  jwt, { decode } from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from './asyncHandler.js'

const authenticate=asyncHandler(async(req,res,next)=>{
    let token;
    // Now we will read JWT(token name) from 'jwt' cookie
        token=req.cookies.jwt;

        if(token){
           try{
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            const user=await User.findById(decoded.userId).select("-password")
            if(!user) throw Error("Invalid token")
            req.user=user
            next();
           } catch(error){
            res.status(401)
            throw new Error("Not authorized,token failed")
           }
        }else{
           throw new Error("Not authorized,no token") 
        }
})


// check for the Admin

const authorizedAdmin=(req,res,next)=>{
    if(req.user&&req.user.isAdmin){
        next()
    }else{
        res.status(401).send("Not authorized as an Admin")
    }
}

export {authenticate,authorizedAdmin}

