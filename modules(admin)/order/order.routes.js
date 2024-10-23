import { Router } from "express";

import { createCashOrder, createCheckoutSession, getAllOrders, getUserOrder } from "./order.controller.js";
import { allowedTo } from "../../middleWare/validations/allowRoles.js";
import { verifyToken } from "../../middleWare/verifyToken.js";









const orderRouter = Router()

// orderRouter.use(protectedRoute,allowedTo('user'))

orderRouter.post("/createCashOrder/:id",verifyToken,createCashOrder)
orderRouter.get("/getUserOrder/",verifyToken,getUserOrder)
orderRouter.get("/getAllOrders/",verifyToken,allowedTo('admin'),getAllOrders)
orderRouter.post("/createCheckoutSession/:id",verifyToken,createCheckoutSession)
// orderRouter.delete("/deleteItem/:id",removeItemFromorder)
// orderRouter.post("/applyCoupon/",applyCoupon)




// nodec42
// O8h9ijGyYrCNFOmq
export default orderRouter