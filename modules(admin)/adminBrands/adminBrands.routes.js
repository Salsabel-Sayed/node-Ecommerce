import { Router } from "express";
import { verifyToken } from "../../middleWare/verifyToken.js";
import { allowedTo } from "../../middleWare/validations/allowRoles.js";
import { filteration, uploadFile } from './../../utils/multers.js';
import { addBrand, deleteBrand, getAllBrand, getBrand, updateBrand } from "./adminBrands.controller.js";


const adminBrandRouter = Router()
adminBrandRouter.post("/addBrand/", verifyToken, allowedTo('admin'), uploadFile(filteration.image).single("image"), addBrand)
adminBrandRouter.put("/updateBrand/:id", verifyToken, allowedTo('admin'), uploadFile(filteration.image).single("image"), updateBrand)
adminBrandRouter.delete("/deleteBrand/:id", verifyToken, allowedTo('admin'), deleteBrand)
adminBrandRouter.get("/getSpecificBrand/:id", verifyToken, allowedTo('admin'), getBrand)
adminBrandRouter.get("/getAllBrand/", verifyToken, allowedTo('admin'), getAllBrand)


export default adminBrandRouter