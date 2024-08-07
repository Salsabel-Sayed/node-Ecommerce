import { appError } from "./appError.js"

export function catchError(callBack){
    return (req,res,next)=>{
        callBack(req,res,next).catch(err =>{
            next(new appError(err,500))
        })
    }
}