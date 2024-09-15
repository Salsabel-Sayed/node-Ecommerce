import { Router } from "express";
import { addCategory, deleteCategories, getAllCategories, getCategories, updateCategories } from "./categories.controller.js";

// import { validate } from "../../middleWare/validations/validate.js";
// import { addCategoriesVal } from "./categories.validation.js";
import subCategoryRouter from "../subCategories/subCategories.routes.js";
import { allowedTo} from "../../middleWare/auth/auth.controller.js";
import { protectedRoute } from "../../middleWare/protectedRoute.js";





const categoryRouter = Router()

categoryRouter.use('/:category/subCategories',subCategoryRouter)

categoryRouter.post("/addCategories/",/*protectedRoute,allowedTo('mgr'),*/addCategory)
categoryRouter.get("/getAllCategories/",getAllCategories)
categoryRouter.get("/getCategories/:id",getCategories)
categoryRouter.put("/updateCategories/:id",/*protectedRoute,allowedTo('admin','mgr'),*/updateCategories)
categoryRouter.delete("/deleteCategories/:id",allowedTo('admin'),protectedRoute,deleteCategories)


export default categoryRouter