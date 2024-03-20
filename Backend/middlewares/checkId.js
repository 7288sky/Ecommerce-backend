import { isValidObjectId } from "mongoose";
import asyncHandler from "./asyncHandler.js";

// function checkId(req,res,next){
// if(!isValidObjectId(req.params.id)){
// res.status(404)
// throw new Error(`Invalid object of :${req.params.id}`)
// }
// next();
// }


const checkId=asyncHandler(async(req,res,next)=>{
    if(!isValidObjectId(req.params.id)){
    res.status(404)
    throw new Error(`Invalid object of :${req.params.id}`)
    }
    next();
    })


    export default checkId;