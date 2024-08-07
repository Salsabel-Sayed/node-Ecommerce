import slugify from "slugify"

import { appError } from "../../middleWare/errorHandling/appError.js"
import { catchError } from './../../middleWare/errorHandling/catchError.js';
import { SubCategory } from "./subCategories.model.js";
import { deleteOne, getSpecfic } from "../handler/handler.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";

// * add subCategories

export const addSubCategory = catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    let subCategory = new SubCategory(req.body)
    await subCategory.save()

    res.json({message:"added",subCategory})
})

// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * get All subCategories

export const getAllSubCategories = catchError(async(req,res,next)=>{
    let filterObj = {}
    if(req.params.category) filterObj.categoryIdRef = req.params.category
    let apiFeatures = new ApiFeatures(SubCategory.find(filterObj), req.query).pagination().fields().filter().search().sort()
    let subCategories = await apiFeatures.dbQuery
    
    subCategories|| next(new appError('subCategory not found', 404))
    !subCategories||  res.json({message:"get all",searching:apiFeatures.searchQuery,subCategories})
})
// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * get subCategories


export const getSubCategories = getSpecfic(SubCategory)
// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * update subCategories


export const updateSubCategories = catchError(async(req,res,next)=>{
    let subCategory = await SubCategory.findByIdAndUpdate(req.params.id , req.body , {new:true})

    subCategory || next(new appError('subCategory not found', 404))
    !subCategory ||  res.json({message:"updated",subCategory})
}
)
// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * delete subCategories


export const deleteSubCategories = deleteOne(SubCategory)