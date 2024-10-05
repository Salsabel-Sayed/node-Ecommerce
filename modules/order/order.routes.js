import { Router } from "express";

import { createCashOrder, createCheckoutSession, getAllOrders, getUserOrder } from "./order.controller.js";
import { protectedRoute } from "../../middleWare/protectedRoute.js";
import { allowedTo } from "../../middleWare/validations/allowRoles.js";









const orderRouter = Router()

// orderRouter.use(protectedRoute,allowedTo('user'))

orderRouter.post("/createCashOrder/:id",protectedRoute,allowedTo('user'),createCashOrder)
orderRouter.get("/getUserOrder/",protectedRoute,allowedTo('admin'),getUserOrder)
orderRouter.get("/getAllOrders/",protectedRoute,allowedTo('admin'),getAllOrders)
orderRouter.post("/createCheckoutSession/:id",protectedRoute,allowedTo('user'),createCheckoutSession)
// orderRouter.delete("/deleteItem/:id",removeItemFromorder)
// orderRouter.post("/applyCoupon/",applyCoupon)




// nodec42
// O8h9ijGyYrCNFOmq
export default orderRouter