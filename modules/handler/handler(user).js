import { appError } from "../../middleWare/errorHandling/appError.js"
import { catchError } from "../../middleWare/errorHandling/catchError.js"
import { ApiFeatures } from './../../utils/apiFeatures.js';



// * get All brand

export const userGetAllBrand = (model)=>{
    return catchError(async (req, res, next) => {
        let apiFeatures = new ApiFeatures(model.find(), req.query).pagination().fields().filter().search().sort()
        let brand = await apiFeatures.dbQuery
        brand || next(new appError('brand not found', 404))
        !brand || res.json({ message: "get all", searching: apiFeatures.searchQuery, brand })
    })
}

// ? ////////////////////////////////////////////////////////////////////////////////////////////////
export const userGetSpecfic =(model)=>{
    return catchError(async(req,res,next)=>{
        const adminId = req.user._id
        console.log("adminId get user", adminId);
        const findAdmin = await model.findById(adminId)
        if (!findAdmin) return next(new appError("cant found user", 404))
            let document = await model.findOne({ _id: req.params.id })
            document || next(new appError('document not found', 404))
            !document || res.json({ message: "get it", document })
            })
}
