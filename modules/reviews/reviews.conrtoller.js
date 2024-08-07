
import { appError } from "../../middleWare/errorHandling/appError.js"
import { catchError } from './../../middleWare/errorHandling/catchError.js';
import { deleteOne, getSpecfic } from "../handler/handler.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";
import { Reviews } from "./reviews.model.js";


// * add brand

export const addReviews = catchError(async(req,res,next)=>{
    req.body.userIdRef =req.user._id
    let isExist = await Reviews.findOne({userIdRef:req.user._id, productIdRef:req.body.productIdRef})
    console.log("userIdRef",req.user._id);
    console.log("productIdRef",req.body.productIdRef);
    
    if(isExist) return next(new appError('u created a review before',409))
    let review = new Reviews(req.body)
    await review.save()

    res.json({message:"added",review})
})

// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * get All review

export const getAllReviews = catchError(async(req,res,next)=>{
    let apiFeatures = new ApiFeatures(Reviews.find(), req.query).pagination().fields().filter().search().sort()
    let review = await apiFeatures.dbQuery
    review|| next(new appError('review not found', 404))
    !review||  res.json({message:"get all",searching:apiFeatures.searchQuery,review})
})
// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * get review
export const getreview = getSpecfic(Reviews)
// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * update review


export const updateReview = catchError(async(req,res,next)=>{
    let review = await Reviews.findOneAndUpdate({_id:req.params.id , userIdRef:req.user._id },req.body, {new:true})
    console.log(req.user._id);
    console.log(req.params.id );
    
    review || next(new appError('review not found or u didnt make any reviews', 404))
    !review ||  res.json({message:"updated",review})
}
)
// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * delete review


export const deleteReview =deleteOne(Reviews)