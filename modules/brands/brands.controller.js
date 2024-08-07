import slugify from "slugify"
import { appError } from "../../middleWare/errorHandling/appError.js"
import { catchError } from './../../middleWare/errorHandling/catchError.js';
import { Brand } from "./brands.model.js";
import { deleteOne, getSpecfic } from "../handler/handler.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";


// * add brand

export const addBrand = catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    req.body.image = req.file.filename
    let brand = new Brand(req.body)
    await brand.save()

    res.json({message:"added",brand})
})

// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * get All brand

export const getAllBrand = catchError(async(req,res,next)=>{
    let apiFeatures = new ApiFeatures(Brand.find(), req.query).pagination().fields().filter().search().sort()
    let brand = await apiFeatures.dbQuery
    brand|| next(new appError('brand not found', 404))
    !brand||  res.json({message:"get all",searching:apiFeatures.searchQuery,brand})
})
// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * get Brand
export const getBrand = getSpecfic(Brand)
// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * update Brand


export const updateBrand = catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    if(req.body.slug)req.body.slug = slugify(req.body.name)
    if(req.file)req.body.image = req.file.filename
    let brand = await Brand.findByIdAndUpdate(req.params.id , req.body , {new:true})

    brand || next(new appError('brand not found', 404))
    !brand ||  res.json({message:"updated",brand})
}
)
// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * delete Brand
export const deleteBrand =deleteOne(Brand)

