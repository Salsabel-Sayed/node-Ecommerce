import slugify from "slugify"
import { appError } from "../../middleWare/errorHandling/appError.js"
import { catchError } from './../../middleWare/errorHandling/catchError.js';

import { deleteOne, getSpecfic } from "../handler/handler.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";
import { User } from "./users.model.js";


// * add user

export const addUser = catchError(async(req,res,next)=>{

    
    let user = new User(req.body)
    await user.save()

    res.json({message:"added",user})
})

// ? ////////////////////////////////////////////////////////////////////////////////////////////////
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