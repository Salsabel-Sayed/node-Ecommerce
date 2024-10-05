import { Router } from "express";
import { verifyToken } from "../../middleWare/verifyToken.js";
import { allowedTo } from "../../middleWare/validations/allowRoles.js";
import { filteration, uploadFile } from './../../utils/multers.js';
import { addProduct  } from "./products.controller.js";

// deleteProduct, getProduct, updateProduct
const adminProductRouter = Router()
adminProductRouter.post("/addProduct/", verifyToken, allowedTo('admin'), uploadFile(filteration.image).fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'images', maxCount: 10 }   
]), addProduct)
// adminProductRouter.put("/updateProduct/:id", verifyToken, allowedTo('admin'), uploadFile(filteration.image).single("image"), updateProduct)
// adminProductRouter.delete("/deleteProduct/:id", verifyToken, allowedTo('admin'), deleteProduct)
// adminProductRouter.get("/getSpecificProduct/:id", verifyToken, allowedTo('admin'), getProduct)
// adminProductRouter.get("/getAllProduct/", verifyToken, allowedTo('admin'), getAllProduct)


export default adminProductRouter