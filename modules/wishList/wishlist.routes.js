import { Router } from "express";
import { addToWishlist, getAllWishlist, removeFromWishlist } from "./wishlist.controller.js";
import { allowedTo, protectedRoute } from "../../middleWare/auth/auth.controller.js";







const wishlistRouter = Router()

wishlistRouter.patch("/addwishlist/",protectedRoute,allowedTo('user'),addToWishlist)
wishlistRouter.delete("/removewishlist/:id",protectedRoute,allowedTo('user','admin'),removeFromWishlist)
wishlistRouter.get("/getAllwishlist/",protectedRoute,allowedTo('user','admin'),getAllWishlist)



export default wishlistRouter