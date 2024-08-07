import { Router } from "express";

import { addUser, deleteUser, getAllUser, getUser, updateAllUsers, updateUser } from "./users.controller.js";
import { checkEmail } from "../../middleWare/checkEmail.js";








const userRouter = Router()

userRouter.post("/addUser/",checkEmail,addUser)
userRouter.get("/getAllusers/",getAllUser)
userRouter.get("/getuser/:id",getUser)
userRouter.put("/updateuser/:id",updateUser)
userRouter.delete("/deleteuser/:id",deleteUser)
userRouter.put("/updateAllUsers/",updateAllUsers)


export default userRouter