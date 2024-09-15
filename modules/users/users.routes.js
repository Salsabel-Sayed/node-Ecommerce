import { Router } from "express";

import { deleteUser, getAllUser, getUser, otpRequest, updateAllUsers, updateUser } from "./users.controller.js";









const userRouter = Router()


userRouter.get("/getAllusers/",getAllUser)
userRouter.get("/getuser/:id",getUser)
userRouter.put("/updateuser/:id",updateUser)
userRouter.delete("/deleteuser/:id",deleteUser)
userRouter.put("/updateAllUsers/",updateAllUsers)
userRouter.post("/requestOtp",otpRequest)


export default userRouter