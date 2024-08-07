
import { appError } from "../../middleWare/errorHandling/appError.js"
import { Cart } from "../cart/cart.model.js";
import { Product } from "../products/products.model.js";
import { catchError } from '../../middleWare/errorHandling/catchError.js';
import { Orders } from './order.model.js';

import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51Pl5iHEYCGyae2RjXyrJgvfmVMud1o8GOmoE7UwfODvc0SzwTPWMpZ4Q5Lmh9Xj35jMItglZB0SWcLmPDiXvsuJ000VviDAMoQ');
// * create cash orders

export const createCashOrder = catchError(async(req,res,next)=>{
    let cart = await Cart.findById(req.params.id)
    if(!cart) return next(new appError('cart not found',404))
        let totalOrderPrice = cart.totalCartAfterDiscount || cart.totalCartPrice
    let order = new Orders({
        userRef:req.user._id,
        orderItem:cart.cartItem,
        shippingAdress:req.body.shippingAdress,
        totalOrderPrice
    })
    await order.save()
    let options = cart.cartItem.map((prod) => {
        return ( {
            updateOne:{
                'filter':{_id:prod.product},
                "update":{$inc:{sold:prod.quantity,stoke:-prod.quantity}}
            }
        })
    })
    await Product.bulkWrite(options)
    await Cart.findByIdAndDelete(cart._id)
    res.json({message:"done", order})
})
// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * get user order

export const getUserOrder = catchError(async(req,res,next)=>{
    let orders = await Orders.findOne({userRef:req.user.id}).populate('orderItem.product')
    if(!orders) return next(new appError('no orders found',404))
        res.json({message:"done", orders})
   
})

// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * get all order

export const getAllOrders = catchError(async(req,res,next)=>{
    let orders = await Orders.find({})
    if(!orders) return next(new appError('no orders found',404))
        res.json({message:"done", orders})
   
})

// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * create checkout session

export const createCheckoutSession = catchError(async(req,res,next)=>{
     let cart = await Cart.findById(req.params.id)
    if(!cart) return next(new appError('cart not found',404))
        let totalOrderPrice = cart.totalCartAfterDiscount || cart.totalCartPrice

    let session = await stripe.checkout.sessions.create({
        line_items:[
            {
                price_data: {  
                    currency: 'egp',  
                    unit_amount: totalOrderPrice * 100,  
                    product_data: {  
                      name: req.user.name,  
                    },  
                  },  
                  quantity: 1, 
            }
        ],
        mode: 'payment',
success_url: "https://hambozoo.netlify.app/#/orders/",
cancel_url: "https://hambozoo.netlify.app/#/",
customer_email: req.user.email,
client_reference_id: req.params.id,
metadata: req.body.shippingAddress,
    })
   
   res.json({message:'success', session})
})
