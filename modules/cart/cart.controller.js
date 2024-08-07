
import { appError } from "../../middleWare/errorHandling/appError.js"
import { Coupons } from "../coupons/coupons.model.js";
import { Product } from "../products/products.model.js";
import { catchError } from './../../middleWare/errorHandling/catchError.js';
import { Cart } from "./cart.model.js";



function clcTotalPrice(isExist){
    isExist.totalCartPrice = isExist.cartItem.reduce((prev , item) => prev += item.quantity * item.price , 0)
    
    if(isExist.discount) {isExist.totalCartAfterDiscount = isExist.totalCartPrice - (isExist.totalCartPrice * isExist.discount)/100}


}
// * add subCategories

export const addCart = catchError(async(req,res,next)=>{
    let isExist = await Cart.findOne({userRef:req.user._id})
    let product = await Product.findById(req.body.product)

    if(!product) return next(new appError('product not found',404))
        req.body.price = product.price
    if(req.body.quantity > product.stoke) return next(new appError("sold out",404))
    
    if(!isExist) {
        let cart =new Cart({
            userRef:req.user._id,
            cartItem:[req.body],
            
        })
        clcTotalPrice(cart)
        await cart.save()
        res.json({message:"added",cart})
    }else{
        let item = isExist.cartItem.find(item => item.product == req.body.product)
        if(item){
            item.quantity += req.body.quantity || 1
            await isExist.save() 
            if(item.quantity > product.stoke) return next(new appError("sold out",404))
        }
        if(!item) isExist.cartItem.push(req.body)
            clcTotalPrice(isExist)
            
        //     let totalPrice = 0;
        // isExist.cartItem.forEach(item =>{
        //     totalPrice += item.quantity * item.price
        // })
       

            await isExist.save()
        res.json({message:"done",isExist})
    }
    

    
})

// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * update quantity


export const updateCart = catchError(async(req,res,next)=>{
    let cart = await Cart.findOne({userRef: req.user._id})
    console.log("cart",cart);
    let item = cart.cartItem.find(item => item.product == req.params.id)
    console.log("item",item);
    
    if(!item) return next(new appError('product not found', 404))
        item.quantity = req.body.quantity
    clcTotalPrice(cart)
    await cart.save()

  
    !cart ||  res.json({message:"updated",cart})
}
)
// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * delete cart


export const removeItemFromCart = catchError(async(req,res,next)=>{

    let cart = await Cart.findOneAndUpdate(  
        { userRef: req.user._id },  
        { $pull: { cartItem: {_id:req.params.id} } },  
        { new: true }  
    ); 

    clcTotalPrice(cart)

    await cart.save()
    cart || next(new appError('cart not found', 404))
    !cart ||  res.json({message:"deleted",cart})
})

// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * get logged user cart


export const getLoggedUserCart = catchError(async(req,res,next)=>{

    let cart = await Cart.findOne({ userRef: req.user._id })
    cart || next(new appError('cart not found', 404))
    !cart ||  res.json({message:"deleted",cart})
})

// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * clear cart

export const clearCart = catchError(async(req,res,next)=>{

    let cart = await Cart.findOneAndDelete({ userRef: req.user._id })
    cart || next(new appError('cart not found', 404))
    !cart ||  res.json({message:"deleted",cart})
})

// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * apply coupon

export const applyCoupon = catchError(async(req,res,next)=>{

    let coupon = await Coupons.findOne({ code: req.body.code , expires:{$gte:Date.now()}})
    console.log("coupon", coupon);
    
    if(!coupon) return  next(new appError('oops! coupon invalid', 404))
        let cart = await Cart.findOne({ userRef: req.user._id })


    
    cart.discount = coupon.discount

    await cart.save()
   
    res.json({message:"okiii",cart})
})



