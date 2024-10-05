import { Router } from "express";
import { addToWishlist, getAllWishlist, removeFromWishlist } from "./wishlist.controller.js";

import { protectedRoute } from "../../middleWare/protectedRoute.js";
import { allowedTo } from "../../middleWare/validations/allowRoles.js";







const wishlistRouter = Router()

wishlistRouter.patch("/addwishlist/",protectedRoute,allowedTo('user'),addToWishlist)
wishlistRouter.delete("/removewishlist/:id",protectedRoute,allowedTo('user','admin'),removeFromWishlist)
wishlistRouter.get("/getAllwishlist/",protectedRoute,allowedTo('user','admin'),getAllWishlist)



export default wishlistRouter