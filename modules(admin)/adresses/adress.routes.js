
import { Router } from "express";

// import { allowedTo } from "../../middleWare/validations/allowRoles.js";
import { addToadresses, getAllAdresses, removeAdresses } from './adress.controller.js';
import { verifyToken } from "../../middleWare/verifyToken.js";










const adressRouter = Router()

adressRouter.patch("/addAdress/", verifyToken,addToadresses)
adressRouter.delete("/removeAdress/:id",verifyToken,removeAdresses)
adressRouter.get("/getAllAdress/", verifyToken, getAllAdresses)



export default adressRouter