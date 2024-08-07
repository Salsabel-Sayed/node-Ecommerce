import { Router } from "express";
import { checkEmail } from "../../middleWare/checkEmail.js";
import { changePassword, signin, signup } from "./auth.controller.js";








const authRouter = Router()

authRouter.post("/signup/",checkEmail,signup)
authRouter.post("/signin/",signin)
authRouter.patch("/changePassword/",changePassword)
// authRouter.patch("/protectedRoute/",protectedRoute)

export default authRouter