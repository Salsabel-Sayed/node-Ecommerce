import { Router } from "express";
import { addSubCategory, deleteSubCategories, getAllSubCategories, getSubCategories, updateSubCategories } from "./subCategories.controller.js";






const subCategoryRouter = Router({mergeParams:true})

subCategoryRouter.route('/')
.post(addSubCategory)
.get(getAllSubCategories)

subCategoryRouter.post("/addSubCategories/",addSubCategory)
subCategoryRouter.get("/getAllSubCategories/",getAllSubCategories)
subCategoryRouter.get("/getSubCategories/:id",getSubCategories)
subCategoryRouter.put("/updateSubCategories/:id",updateSubCategories)
subCategoryRouter.delete("/deleteSubCategories/:id",deleteSubCategories)


export default subCategoryRouter