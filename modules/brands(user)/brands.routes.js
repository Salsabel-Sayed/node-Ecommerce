import { Router } from "express";
import {  getAllBrand, getBrand } from "./brands.controller.js";


const brandRouter = Router()

// brandRouter.post("/addBrand/",addBrand)
brandRouter.get("/getAllBrands/",getAllBrand)
brandRouter.get("/getBrand/:id",getBrand)

export default brandRouter