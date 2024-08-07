import { User } from "../modules/users/users.model.js"
import { appError } from "./errorHandling/appError.js"
import { catchError } from "./errorHandling/catchError.js"


export const checkEmail = catchError(async(req,res,next)=>{
    let isExist = await User.findOne({email:req.body.email})
    if(isExist){
        return next(new appError('Email already exist',409))
    }
    next()
})