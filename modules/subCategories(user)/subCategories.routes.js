import { Router } from "express";
import {getAllSubCategories, getSubCategories} from "./subCategories.controller.js";
import { verifyToken } from "../../middleWare/verifyToken.js";






const subCategoryRouter = Router({mergeParams:true})

// subCategoryRouter.route('/')
// .post(addSubCategory)
// .get(getAllSubCategories)

subCategoryRouter.use(verifyToken)


subCategoryRouter.get("/getAllSubCategories/",getAllSubCategories)
subCategoryRouter.get("/getSubCategories/:id",getSubCategories)



export default subCategoryRouter