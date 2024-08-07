import { Router } from "express";

import { allowedTo, protectedRoute } from "../../middleWare/auth/auth.controller.js";
import { addToadresses, getAlladresses, removeAdresses } from "./adress.controller.js";







const adressRouter = Router()

adressRouter.patch("/addaAdress/",protectedRoute,allowedTo('user'),addToadresses)
adressRouter.delete("/removeAdress/:id",protectedRoute,allowedTo('user','admin'),removeAdresses)
adressRouter.get("/getAllAdress/",protectedRoute,allowedTo('user','admin'),getAlladresses)



export default adressRouter