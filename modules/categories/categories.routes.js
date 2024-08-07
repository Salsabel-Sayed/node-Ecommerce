import { Router } from "express";
import { addCategory, deleteCategories, getAllCategories, getCategories, updateCategories } from "./categories.controller.js";
import { uploadSingleFile } from "../../uploadFiles/fileUpload.js";
import { validate } from "../../middleWare/validations/validate.js";
import { addCategoriesVal } from "./categories.validation.js";
import subCategoryRouter from "../subCategories/subCategories.routes.js";
import { allowedTo, protectedRoute } from "../../middleWare/auth/auth.controller.js";





const categoryRouter = Router()

categoryRouter.use('/:category/subCategories',subCategoryRouter)

categoryRouter.post("/addCategories/",protectedRoute,allowedTo('mgr'),uploadSingleFile('image','categories'),addCategory)
categoryRouter.get("/getAllCategories/",getAllCategories)
categoryRouter.get("/getCategories/:id",getCategories)
categoryRouter.put("/updateCategories/:id",protectedRoute,allowedTo('admin','mgr'),uploadSingleFile('image','categories'),updateCategories)
categoryRouter.delete("/deleteCategories/:id",allowedTo('admin'),protectedRoute,deleteCategories)


export default categoryRouter