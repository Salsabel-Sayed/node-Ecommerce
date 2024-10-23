
import { appError } from "../../middleWare/errorHandling/appError.js"
import { catchError } from "../../middleWare/errorHandling/catchError.js"
import { ApiFeatures } from "../../utils/apiFeatures.js";


// * delete one
export const adminDeleteOne =(model)=>{
    return catchError(async (req, res, next) => {
        const findAdmin = await model.findById(req.params.id)
        console.log("findAdmin", findAdmin);

        if (!findAdmin) return next(new appError("cant found id", 404))
        let document = await model.findByIdAndDelete(req.params.id)
        document || next(new appError(`document not found`, 404))
        !document || res.json({ message: "deleted", document })
    })
}

// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * get All 
export const adminGetAll =(model)=>{
    return catchError(async (req, res, next) => {
        let apiFeatures = new ApiFeatures(model.find(), req.query)
        .pagination()
        .filter()
        .search()
        .fields()
        .sort()
        let brands = await apiFeatures.dbQuery
        brands || next(new appError('Brand not found', 404))
        !brands || res.json({ message: "get all", searching: apiFeatures.searchQuery, brands })
    })
}

// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * get Specfic 
export const adminGetSpecfic =(model)=>{
    return catchError(async(req,res,next)=>{
        const adminId = req.user.role
        console.log("adminId", adminId);
        
        if (!adminId) return next(new appError("cant found admin", 404))
        if (adminId !== "admin") return next(new appError("u r not admin !", 404))
            if(adminId === "admin"){
            let document = await model.findOne({ _id: req.params.id })
            console.log("docmnt",document);
            
            document || next(new appError('document not found', 404))
            !document || res.json({ message: "get it", document })
            }})
}
