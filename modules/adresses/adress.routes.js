import { Router } from "express";


import { addToadresses, getAlladresses, removeAdresses } from "./adress.controller.js";
import { protectedRoute } from "../../middleWare/protectedRoute.js";
import { allowedTo } from "../../middleWare/validations/allowRoles.js";







const adressRouter = Router()

adressRouter.patch("/addaAdress/",protectedRoute,allowedTo('user'),addToadresses)
adressRouter.delete("/removeAdress/:id",protectedRoute,allowedTo('user','admin'),removeAdresses)
adressRouter.get("/getAllAdress/",protectedRoute,allowedTo('user','admin'),getAlladresses)



export default adressRouter