import { Router } from "express";

import { allowedTo, protectedRoute } from './../../middleWare/auth/auth.controller.js';
import { addCart, applyCoupon, clearCart, getLoggedUserCart, removeItemFromCart, updateCart } from "./cart.controller.js";








const cartRouter = Router()

cartRouter.use(protectedRoute,allowedTo('user'))

cartRouter.post("/addcart/",addCart)
cartRouter.put("/updatecart/:id",updateCart)
cartRouter.get("/getUserCart/",getLoggedUserCart)
cartRouter.delete("/clearCart/",clearCart)
cartRouter.delete("/deleteItem/:id",removeItemFromCart)
cartRouter.post("/applyCoupon/",applyCoupon)


export default cartRouter