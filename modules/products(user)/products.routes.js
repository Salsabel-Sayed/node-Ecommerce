import { Router } from "express";
import { verifyToken } from "../../middleWare/verifyToken.js";
import { allowedTo } from "../../middleWare/validations/allowRoles.js";



const adminProductRouter = Router()

adminProductRouter.get("/getSpecificProduct/:id", verifyToken, allowedTo('user'), getProduct)
userProductRouter.get("/getAllProduct/", verifyToken, allowedTo('user'), getAllProduct)


// export default adminProductRouter