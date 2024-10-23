import { Router } from "express";
import { addCoupon, deleteCoupon, getAllCoupon, getCoupon, updateCoupon } from "./coupons.controller.js";
import { allowedTo } from "../../middleWare/validations/allowRoles.js";
import { verifyToken } from './../../middleWare/verifyToken.js';








const couponRouter = Router()
couponRouter.use(verifyToken,allowedTo('admin'))

couponRouter.post("/addcoupon/",addCoupon)
couponRouter.get("/getAllcoupon/",getAllCoupon)
couponRouter.get("/getcoupon/:id",getCoupon)
couponRouter.put("/updatecoupon/:id",updateCoupon)
couponRouter.delete("/deletecoupon/:id",deleteCoupon)


export default couponRouter