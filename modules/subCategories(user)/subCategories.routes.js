import { Router } from "express";

import { verifyToken } from "../../middleWare/verifyToken.js";
import { allowedTo } from "../../middleWare/validations/allowRoles.js";
import { getAllSubCategories, getSubCategories } from './subCategories.controller.js';






const subCategoryRouter = Router({mergeParams:true})
subCategoryRouter.use(verifyToken,allowedTo('user'))
subCategoryRouter.get("/getAllSubCategories/",getAllSubCategories)
subCategoryRouter.get("/getSubCategories/:id",getSubCategories)



export default subCategoryRouter