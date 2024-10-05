import { Router } from "express";
import { addReviews, deleteReview, getAllReviews, getreview, updateReview } from "./reviews.conrtoller.js";

import { protectedRoute } from "../../middleWare/protectedRoute.js";
import { allowedTo } from "../../middleWare/validations/allowRoles.js";







const reviewRouter = Router()

reviewRouter.post("/addreview/",protectedRoute,allowedTo('user'),addReviews)
reviewRouter.get("/getAllreviews/",getAllReviews)
reviewRouter.get("/getreview/:id",getreview)
reviewRouter.put("/updatereview/:id",protectedRoute,allowedTo('user'),updateReview)
reviewRouter.delete("/deletereview/:id",protectedRoute,allowedTo('user','admin'),deleteReview)


export default reviewRouter