import slugify from "slugify"
import { appError } from "../../middleWare/errorHandling/appError.js"
import { catchError } from '../../middleWare/errorHandling/catchError.js';
import { User } from "../users/users.model.js";










// * add adress

export const addToadresses = catchError(async(req,res,next)=>{
  
    let adress = await User.findByIdAndUpdate(req.user._id ,{$push:{addresses:req.body}} , {new:true})

    adress || next(new appError('adress not found', 404))
    !adress ||  res.json({message:"updated",address: adress})
})

// * remove adress

export const removeAdresses = catchError(async(req,res,next)=>{
  
    let adress = await User.findByIdAndUpdate(req.user._id ,{$pull:{addresses:req.body}} , {new:true})

    adress || next(new appError('adress not found', 404))
    !adress ||  res.json({message:"deleted",address: adress})
})

// * get all user Adress

export const getAlladresses= catchError(async(req,res,next)=>{
  
    let adress = await User.findById(req.user._id)

    adress || next(new appError('adress not found', 404))
    !adress ||  res.json({message:"updated",adress: adress})
})

