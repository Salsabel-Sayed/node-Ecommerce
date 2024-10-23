import { Router } from "express";
import { addCategory, deleteCategories, getAllCategories, getCategories, updateCategories } from "./adminCategory.controller.js";
import { verifyToken } from "../../middleWare/verifyToken.js";
import { allowedTo } from "../../middleWare/validations/allowRoles.js";
import { filteration, uploadFile } from "../../utils/multers.js";



const adminCategoryRouter = Router()
adminCategoryRouter.post("/addCategories/", verifyToken, allowedTo('admin'), uploadFile(filteration.image).single("image"),addCategory)
adminCategoryRouter.put("/updateCategories/:id", verifyToken, allowedTo('admin'), uploadFile(filteration.image).single("image") ,updateCategories)
adminCategoryRouter.delete("/deleteCategories/:id", verifyToken, allowedTo('admin'), deleteCategories)
adminCategoryRouter.get("/getSpecificCategory/:id", verifyToken, allowedTo('admin'), getCategories)
adminCategoryRouter.get("/adminGetAllCategories/", verifyToken, allowedTo('admin'), getAllCategories)


export default adminCategoryRouter