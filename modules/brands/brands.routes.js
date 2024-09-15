import { Router } from "express";
import { addBrand, deleteBrand, getAllBrand, getBrand, updateBrand } from "./brands.controller.js";
// import { uploadSingleFile } from "../../uploadFiles/fileUpload.js";







const brandRouter = Router()

brandRouter.post("/addBrand/",addBrand)
brandRouter.get("/getAllBrands/",getAllBrand)
brandRouter.get("/getBrand/:id",getBrand)
brandRouter.put("/updateBrand/:id",updateBrand)
brandRouter.delete("/deleteBrand/:id",deleteBrand)


export default brandRouter