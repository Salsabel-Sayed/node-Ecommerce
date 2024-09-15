import { Router } from "express";
import { addReviews, deleteReview, getAllReviews, getreview, updateReview } from "./reviews.conrtoller.js";
import { allowedTo } from "../../middleWare/auth/auth.controller.js";
import { protectedRoute } from "../../middleWare/protectedRoute.js";







const reviewRouter = Router()

reviewRouter.post("/addreview/",protectedRoute,allowedTo('user'),addReviews)
reviewRouter.get("/getAllreviews/",getAllReviews)
reviewRouter.get("/getreview/:id",getreview)
reviewRouter.put("/updatereview/:id",protectedRoute,allowedTo('user'),updateReview)
reviewRouter.delete("/deletereview/:id",protectedRoute,allowedTo('user','admin'),deleteReview)


export default reviewRouter