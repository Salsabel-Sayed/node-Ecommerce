
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
// // ? ////////////////////////////////////////////////////////////////////////////////////////////////
// // * update quantity


// export const updateCart = catchError(async(req,res,next)=>{
//     let cart = await Cart.findOne({userRef: req.user._id})
//     console.log("cart",cart);
//     let item = cart.cartItem.find(item => item.product == req.params.id)
//     console.log("item",item);
    
//     if(!item) return next(new appError('product not found', 404))
//         item.quantity = req.body.quantity
//     clcTotalPrice(cart)
//     await cart.save()

  
//     !cart ||  res.json({message:"updated",cart})
// }
// )
// // ? ////////////////////////////////////////////////////////////////////////////////////////////////
// // * delete cart


// export const removeItemFromCart = catchError(async(req,res,next)=>{

//     let cart = await Cart.findOneAndUpdate(  
//         { userRef: req.user._id },  
//         { $pull: { cartItem: {_id:req.params.id} } },  
//         { new: true }  
//     ); 

//     clcTotalPrice(cart)

//     await cart.save()
//     cart || next(new appError('cart not found', 404))
//     !cart ||  res.json({message:"deleted",cart})
// })

// // ? ////////////////////////////////////////////////////////////////////////////////////////////////
// // * get logged user cart


// export const getLoggedUserCart = catchError(async(req,res,next)=>{

//     let cart = await Cart.findOne({ userRef: req.user._id })
//     cart || next(new appError('cart not found', 404))
//     !cart ||  res.json({message:"deleted",cart})
// })

// // ? ////////////////////////////////////////////////////////////////////////////////////////////////
// // * clear cart

// export const clearCart = catchError(async(req,res,next)=>{

//     let cart = await Cart.findOneAndDelete({ userRef: req.user._id })
//     cart || next(new appError('cart not found', 404))
//     !cart ||  res.json({message:"deleted",cart})
// })

// // ? ////////////////////////////////////////////////////////////////////////////////////////////////
// // * apply coupon

// export const applyCoupon = catchError(async(req,res,next)=>{

//     let coupon = await Coupons.findOne({ code: req.body.code , expires:{$gte:Date.now()}})
//     console.log("coupon", coupon);
    
//     if(!coupon) return  next(new appError('oops! coupon invalid', 404))
//         let cart = await Cart.findOne({ userRef: req.user._id })


    
//     cart.discount = coupon.discount

//     await cart.save()
   
//     res.json({message:"okiii",cart})
// })



