
import { Category } from "./categories.model.js"
import { appError } from "../../middleWare/errorHandling/appError.js"
import { catchError } from "../../middleWare/errorHandling/catchError.js"
import { getSpecfic } from "../handler/handler.js"
import { ApiFeatures } from "../../utils/apiFeatures.js"
// import {fileURLToPath} from "url"

// import fs from "fs"
// import cloudinary from "../../utils/cloudinary.js"




// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * get All Categories

export const getAllCategories = catchError(async(req,res,next)=>{
    let apiFeatures = new ApiFeatures(Category.find(), req.query).pagination().fields().filter().search().sort()
    let categories = await apiFeatures.dbQuery
    categories || next(new appError('category not found', 404))
    !categories ||  res.json({message:"get all",searching:apiFeatures.searchQuery,categories})
})
// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * get Specfic category

export const getSpecificCategory = getSpecfic(Category)

