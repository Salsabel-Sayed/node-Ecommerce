import slugify from "slugify"
import { appError } from "../../middleWare/errorHandling/appError.js"
import { catchError } from './../../middleWare/errorHandling/catchError.js';

import { deleteOne, getSpecfic } from "../handler/handler.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";
import { User } from "./users.model.js";
import { nanoid } from "nanoid";
import {sendEmail } from "../../utils/sendEmail.js";



// * get All users

export const getAllUser = catchError(async(req,res,next)=>{
    let apiFeatures = new ApiFeatures(User.find(), req.query).pagination().fields().filter().search().sort()
    let user = await apiFeatures.dbQuery
    user|| next(new appError('user not found', 404))
    !user||  res.json({message:"get all",searching:apiFeatures.searchQuery,user})
})
// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * get user
export const getUser = getSpecfic(User)
// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * update user


export const updateUser = catchError(async(req,res,next)=>{
    let user = await User.findByIdAndUpdate(req.params.id , req.body , {new:true})

    user || next(new appError('user not found', 404))
    !user ||  res.json({message:"updated",user})
})

// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * update all user


export const updateAllUsers = catchError(async(req,res,next)=>{
   
    let user = await User.updateMany({}, { $set: { confirmEmail: false } })

    user || next(new appError('user not found', 404))
    !user ||  res.json({message:"updated",user})
})
// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * delete User
export const deleteUser =deleteOne(User)

// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * otp msg to email
export const otpRequest = catchError(async(req,res,next)=>{
    const otp = nanoid(6)
    const user = await User.findOneAndUpdate({email:req.body.email},{otp})
    const html1 = html(otp)
    sendEmail({to:user.email,subject:"otp",html:html1})
    return res.json("check email")
})

export const checkOtp = catchError(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email,otp:req.body.otp})
    if(!user){
        return res.json("invalid otp")
    }
    await User.updateOne({email:req.body.email},{})
})