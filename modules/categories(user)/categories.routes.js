import { Router } from "express";
import { getAllCategories, getSpecificCategory } from "./categories.controller.js";
import subCategoryRouter from "../subCategories/subCategories.routes.js";
import { verifyToken } from "../../middleWare/verifyToken.js";







const categoryRouter = Router()

categoryRouter.use('/:category/subCategories', subCategoryRouter)
categoryRouter.use(verifyToken)

categoryRouter.get("/getAllCategories/",getAllCategories)
categoryRouter.get("/getSpCategory/:id",getSpecificCategory)



export default categoryRouter