
import { appError } from "../../middleWare/errorHandling/appError.js"
import { catchError } from '../../middleWare/errorHandling/catchError.js';
import { ApiFeatures } from "../../utils/apiFeatures.js";
import { Reviews } from './reviews.model.js';
import { adminDeleteOne, adminGetSpecfic } from "../../modules/handler/adminHandler.js";


// * add review
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
// * get reviews by admin
export const getreview = adminGetSpecfic(Reviews)
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
export const deleteReview = catchError(async (req, res, next) => {
    const adminId = req.user._id
    console.log("adminId", adminId)

    const findAdmin = await Reviews.findOne({ userIdRef: adminId })
    console.log("findAdmin", findAdmin);
    if (!findAdmin) return next(new appError("cant found admin", 404))

    let deletedReview = await Reviews.findByIdAndDelete(req.params.id)
    deletedReview || next(new appError('deletedReview not found', 404))
    !deletedReview || res.json({ message: "deleted", deletedReview })


})