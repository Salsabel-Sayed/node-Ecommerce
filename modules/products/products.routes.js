import { Router } from "express";
import { addProduct, deleteProducts, getAllProducts, getProducts, updateProducts } from "./products.controller.js";






const productRouter = Router()

productRouter.post("/addProduct/",addProduct)
productRouter.get("/getAllProducts/",getAllProducts)
productRouter.get("/getproducts/:id",getProducts)
productRouter.put("/updateproducts/:id",updateProducts)
productRouter.delete("/deleteproducts/:id",deleteProducts)


export default productRouter