import { appError } from "../../middleWare/errorHandling/appError.js"
import { catchError } from "../../middleWare/errorHandling/catchError.js"


export const deleteOne =(model)=>{
    return catchError(async(req,res,next)=>{
        let document = await model.findByIdAndDelete(req.params.id)
        document || next(new appError('document not found', 404))
        !document ||  res.json({message:"deleted",document})
    })
}


export const getSpecfic =(model)=>{
    return catchError(async(req,res,next)=>{
        let document = await model.findOne({_id:req.params.id})
    document || next(new appError('document not found', 404))
    !document ||  res.json({message:"get it",document})
    })
}
