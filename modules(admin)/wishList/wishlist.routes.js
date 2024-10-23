import { Router } from "express";
import { addToWishlist, getAllWishlist, removeFromWishlist } from "./wishlist.controller.js";

import { verifyToken } from "../../middleWare/verifyToken.js";
import { allowedTo } from "../../middleWare/validations/allowRoles.js";







const wishlistRouter = Router()

wishlistRouter.patch("/addwishlist/",verifyToken,allowedTo('user','admin'),addToWishlist)
wishlistRouter.put("/removewishlist/:id",verifyToken,allowedTo('user','admin'),removeFromWishlist)
wishlistRouter.get("/getAllwishlist/",verifyToken,allowedTo('user','admin'),getAllWishlist)



export default wishlistRouter