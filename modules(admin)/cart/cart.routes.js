import { Router } from "express";
import { addCart, applyCoupon, clearCart, getLoggedUserCart, removeItemFromCart, removeQuantityItemFromCart, updateCart } from "./cart.controller.js";
import { verifyToken } from './../../middleWare/verifyToken.js';
import { allowedTo } from './../../middleWare/validations/allowRoles.js';


const cartRouter = Router()



cartRouter.post("/addcart/", verifyToken, addCart)
cartRouter.put("/updatecart/:id", verifyToken, allowedTo('user','admin'), updateCart)
cartRouter.delete("/deleteItem/:id", verifyToken, allowedTo('user', 'admin'), removeItemFromCart)
cartRouter.delete("/decreaseQuItem/:id", verifyToken, allowedTo('user', 'admin'), removeQuantityItemFromCart)
cartRouter.get("/getUserCart/", verifyToken, allowedTo('user', 'admin'), getLoggedUserCart)
cartRouter.delete("/clearCart/", verifyToken, allowedTo('user', 'admin'), clearCart)
cartRouter.post("/applyCoupon/", verifyToken, allowedTo('admin'),applyCoupon)


export default cartRouter