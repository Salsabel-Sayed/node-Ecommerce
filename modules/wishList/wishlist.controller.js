import slugify from "slugify"
import { appError } from "../../middleWare/errorHandling/appError.js"
import { catchError } from '../../middleWare/errorHandling/catchError.js';

import { User } from "../users/users.model.js";





// * update wishlist

export const addToWishlist = catchError(async(req,res,next)=>{
  
    let wishlist = await User.findByIdAndUpdate(req.user._id ,{$addToSet:{wishList:req.body.product}} , {new:true})

    wishlist || next(new appError('wishlist not found', 404))
    !wishlist ||  res.json({message:"updated",wishList: wishlist})
})

// * remove wishlist

export const removeFromWishlist = catchError(async(req,res,next)=>{
  
    let wishlist = await User.findByIdAndUpdate(req.user._id ,{$pull:{wishList:req.params.id}} , {new:true})

    wishlist || next(new appError('wishlist not found', 404))
    !wishlist ||  res.json({message:"updated",wishList: wishlist})
})

// * get all user wishlist

export const getAllWishlist = catchError(async(req,res,next)=>{
  
    let wishlist = await User.findById(req.user._id).populate('wishList')

    wishlist || next(new appError('wishlist not found', 404))
    !wishlist ||  res.json({message:"updated",wishList: wishlist})
})

