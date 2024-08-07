import slugify from "slugify"
import { appError } from "../../middleWare/errorHandling/appError.js"
import { catchError } from './../../middleWare/errorHandling/catchError.js';
import { Coupons } from "./coupons.model.js";



// * add subCategories

export const addCoupon = catchError(async(req,res,next)=>{
    let isExist = await Coupons.findOne({code:req.body.code})
    if(isExist) next(new appError('code is exist before',409))
    let coupon = new Coupons(req.body)
    await coupon.save()

    res.json({message:"added",coupon})
})

// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * get All Categories

export const getAllCoupon = catchError(async(req,res,next)=>{
    let coupon = await Coupons.find()
    
    coupon|| next(new appError('coupon not found', 404))
    !coupon||  res.json({message:"get all",coupon})
})
// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * get coupon


export const getCoupon = catchError(async(req,res,next)=>{
    let coupon = await Coupons.findById(req.params.id)
    coupon || next(new appError('coupon not found', 404))
    !coupon ||  res.json({message:"get it",coupon})
}
)
// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * update coupon


export const updateCoupon = catchError(async(req,res,next)=>{
    let coupon = await Coupons.findByIdAndUpdate(req.params.id , req.body , {new:true})

    coupon || next(new appError('coupon not found', 404))
    !coupon ||  res.json({message:"updated",coupon})
}
)
// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * delete coupon


export const deleteCoupon = catchError(async(req,res,next)=>{
    let coupon = await Coupons.findByIdAndDelete(req.params.id)
    coupon || next(new appError('coupon not found', 404))
    !coupon ||  res.json({message:"deleted",coupon})
   
   
})