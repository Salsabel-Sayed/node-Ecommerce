import { Router } from "express";
import { addBrand, deleteBrand, getAllBrand, getBrand, updateBrand } from "./brands.controller.js";
import { uploadSingleFile } from "../../uploadFiles/fileUpload.js";







const brandRouter = Router()

brandRouter.post("/addBrand/",uploadSingleFile('image', 'brands'),addBrand)
brandRouter.get("/getAllBrands/",getAllBrand)
brandRouter.get("/getBrand/:id",getBrand)
brandRouter.put("/updateBrand/:id",uploadSingleFile('image', 'brands'),updateBrand)
brandRouter.delete("/deleteBrand/:id",deleteBrand)


export default brandRouter