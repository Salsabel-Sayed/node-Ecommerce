import { Router } from "express";
import { addProduct, deleteProducts, getAllProducts, getProducts, updateProducts } from "./products.controller.js";
import { uploadMixOfFiles } from "../../uploadFiles/fileUpload.js";





const productRouter = Router()

productRouter.post("/addProduct/",uploadMixOfFiles([{name:'imageCover',maxCount:1},{name:'images', maxCount:7}],'products'),addProduct)
productRouter.get("/getAllProducts/",getAllProducts)
productRouter.get("/getproducts/:id",getProducts)
productRouter.put("/updateproducts/:id",uploadMixOfFiles([{name:'imageCover',maxCount:1},{name:'images', maxCount:7}],'products'),updateProducts)
productRouter.delete("/deleteproducts/:id",deleteProducts)


export default productRouter