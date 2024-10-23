import { appError } from "../../middleWare/errorHandling/appError.js"
import { catchError } from '../../middleWare/errorHandling/catchError.js';
import { User } from "../users(admin)/users.model.js";






// * add to wishlist

export const addToWishlist = catchError(async(req,res,next)=>{
    console.log("userId", req.user._id);
    
    let wishlist = await User.findByIdAndUpdate(req.user._id ,{$addToSet:{wishList:req.body.product}} , {new:true})

    wishlist || next(new appError('wishlist not found', 404))
    !wishlist ||  res.json({message:"updated",wishList: wishlist})
})

//? //////////////////////////////////////////////////////////////////////////////////////////
// * remove wishlist
export const removeFromWishlist = catchError(async (req, res, next) => {
    let wishlist = await User.findByIdAndUpdate(
        req.user._id,
        { $pull: { wishList: req.params.id } },
        { new: true }
    );

    // Checking for a valid return  
    if (!wishlist) {
        return next(new appError('Wishlist not found', 404));
    }

    res.json({ message: "Updated", wishList: wishlist });
});

//? //////////////////////////////////////////////////////////////////////////////////////////
// * get all user wishlist
export const getAllWishlist = catchError(async(req,res,next)=>{
  
    let wishlist = await User.findById(req.user._id).populate('wishList')

    wishlist || next(new appError('wishlist not found', 404))
    !wishlist ||  res.json({message:"updated",wishList: wishlist})
})

