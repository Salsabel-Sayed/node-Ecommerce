import { Router } from "express";

import { addCart, applyCoupon, clearCart, getLoggedUserCart, removeItemFromCart, updateCart } from "./cart.controller.js";
import { protectedRoute } from "../../middleWare/protectedRoute.js";
import { allowedTo } from "../../middleWare/validations/allowRoles.js";








const cartRouter = Router()

cartRouter.use(protectedRoute,allowedTo('user'))

cartRouter.post("/addcart/",addCart)
cartRouter.put("/updatecart/:id",updateCart)
cartRouter.get("/getUserCart/",getLoggedUserCart)
cartRouter.delete("/clearCart/",clearCart)
cartRouter.delete("/deleteItem/:id",removeItemFromCart)
cartRouter.post("/applyCoupon/",applyCoupon)


export default cartRouter