import { Router } from "express";
import { addAdmin, adminDeleteUser, adminGetUser, adminUpdateAllUsers, getAllUser, otpRequest, updateUser } from "./users.controller.js";
import { verifyToken } from '../../middleWare/verifyToken.js';
import { checkEmail } from "../../middleWare/checkEmail.js";
import { allowedTo } from "../../middleWare/validations/allowRoles.js";




const userRouter = Router()

userRouter.post("/addAdmin/", verifyToken,checkEmail, addAdmin)
userRouter.get("/getAllusers/", verifyToken,allowedTo('admin'), getAllUser)

userRouter.get("/getuser/:id", verifyToken, allowedTo('admin'), adminGetUser)
userRouter.put("/updateuser/:id", verifyToken, allowedTo('admin'), updateUser)
userRouter.delete("/deleteuser/:id", verifyToken, allowedTo('admin') ,adminDeleteUser)
userRouter.put("/updateAllUsers/", verifyToken, allowedTo('admin') ,adminUpdateAllUsers)
userRouter.post("/requestOtp", otpRequest)
// userRouter.get("/getUser/:id", verifyToken,getUser)


export default userRouter