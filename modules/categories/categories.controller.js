import slugify from "slugify"
import { Category } from "./categories.model.js"
import { appError } from "../../middleWare/errorHandling/appError.js"
import { catchError } from "../../middleWare/errorHandling/catchError.js"
import { deleteOne, getSpecfic } from "../handler/handler.js"
import { ApiFeatures } from "../../utils/apiFeatures.js"
import {fileURLToPath} from "url"
import path from "path"
import fs from "fs"



// * add Categories
export const addCategory = catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    req.body.image = req.file.filename
    let category = new Category(req.body)
    await category.save()
    res.json({message:"added",category})
})

// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * get All Categories

export const getAllCategories = catchError(async(req,res,next)=>{
    let apiFeatures = new ApiFeatures(Category.find(), req.query).pagination().fields().filter().search().sort()
    let categories = await apiFeatures.dbQuery
    categories || next(new appError('category not found', 404))
    !categories ||  res.json({message:"get all",searching:apiFeatures.searchQuery,categories})
})
// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * get Categories

export const getCategories = getSpecfic(Category)
// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * update Categories

export const updateCategories = catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    if(req.body.slug)req.body.slug = slugify(req.body.name)
    if(req.file)req.body.image = req.file.filename
    
    const __dirname = fileURLToPath(import.meta.url) 
    

    let category = await Category.findByIdAndUpdate(req.params.id , req.body , {new:true})
    const oldImagePath = path.join(__dirname,`../../../../../Node.js/mutiisAssignments/E-commerce/uploads/categories/${category.image}`);  
    console.log("oldImagePath:", oldImagePath);
    
    if (fs.existsSync(oldImagePath)) {  
        fs.unlinkSync(oldImagePath)
        console.log(`Deleted old image: ${oldImagePath}`); 
    } 
    category || next(new appError('category not found', 404))
    !category ||  res.json({message:"updated",category})
}
)
// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * delete Categories

export const deleteCategories = deleteOne(Category)