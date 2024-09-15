import { appError } from "./appError.js"

export function catchError(callBack){
    return (req,res,next)=>{
        return callBack(req,res,next).catch(err =>{
            return next(new appError(err,500))
        })
    }
}