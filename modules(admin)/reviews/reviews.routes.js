import { Router } from "express";
import { addReviews, deleteReview, getAllReviews, getreview, updateReview } from "./reviews.conrtoller.js";
import { verifyToken } from "../../middleWare/verifyToken.js";
import { allowedTo } from "../../middleWare/validations/allowRoles.js";








const reviewRouter = Router()

reviewRouter.post("/addreview/",verifyToken,allowedTo('user'),addReviews)
reviewRouter.get("/getAllreviews/",verifyToken,allowedTo('admin'),getAllReviews)
reviewRouter.get("/getreview/:id",verifyToken,allowedTo('admin'),getreview)
reviewRouter.put("/updatereview/:id",verifyToken,allowedTo('admin'),updateReview)
reviewRouter.delete("/deletereview/:id",verifyToken,allowedTo('user','admin'),deleteReview)


export default reviewRouter