import { Router } from "express";
import { checkEmail } from "../../middleWare/checkEmail.js";
import {deleteUser, getUser, logout, requestUpdatePassword, signin, signup, updatePassword, updateUser, verifyOtp } from "./auth.controller.js";
import { verifyToken } from "../verifyToken.js";
import { protectedRoute } from "../protectedRoute.js";








const authRouter = Router()

authRouter.post("/signup/", checkEmail, signup)
authRouter.post("/verifyOtp/",verifyOtp)
authRouter.post("/signin/", verifyToken, signin)
authRouter.put("/logout/", verifyToken, logout)
authRouter.get("/requestUpdatePassword/", protectedRoute, requestUpdatePassword);
authRouter.put("/updatePassword/", protectedRoute, updatePassword);
authRouter.put("/updateUser/", verifyToken, updateUser);
authRouter.delete("/deleteUser/", verifyToken, deleteUser);
authRouter.get("/getUser/", verifyToken, getUser);
// authRouter.patch("/protectedRoute/",protectedRoute)

export default authRouter