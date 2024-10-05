import { Router } from "express";

import { addAdmin, deleteUser, getAllUser, getUser, otpRequest, updateAllUsers, updateUser } from "./users.controller.js";
import { verifyToken } from './../../middleWare/verifyToken.js';









const userRouter = Router()

userRouter.post("/addAdmin/", verifyToken, addAdmin)
userRouter.get("/getAllusers/", verifyToken, getAllUser)

// userRouter.get("/getuser/:id",getUser)
userRouter.put("/updateuser/:id",verifyToken,updateUser)
userRouter.delete("/deleteuser/:id",verifyToken,deleteUser)
userRouter.put("/updateAllUsers/",verifyToken,updateAllUsers)
userRouter.post("/requestOtp", otpRequest)
userRouter.get("/getUser/:id", verifyToken,getUser)


export default userRouter