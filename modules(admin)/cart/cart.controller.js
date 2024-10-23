
import { appError } from "../../middleWare/errorHandling/appError.js"
import { Coupons } from "../coupons/coupons.model.js";

import { catchError } from '../../middleWare/errorHandling/catchError.js';
import { Cart } from "./cart.model.js";
import { Product } from './../../modules/products(user)/products.model.js';



function clcTotalPrice(isExist){
    isExist.totalCartPrice = isExist.cartItem.reduce((prev , item) => prev += item.quantity * item.price , 0)
    if(isExist.discount) {isExist.totalCartAfterDiscount = isExist.totalCartPrice - (isExist.totalCartPrice * isExist.discount)/100}
}
// * add carts

export const addCart = catchError(async(req,res,next)=>{
    let isExist = await Cart.findOne({userRef:req.user._id})
    console.log("isExist", isExist);
    
    let product = await Product.findById(req.body.product)
    console.log("product", product);
    

    if(!product) return next(new appError('product not found',404))
        req.body.price = product.price
    if(req.body.quantity > product.stock) return next(new appError("sold out",404))
    
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
            if(item.quantity > product.stock) return next(new appError("sold out",404))
        }
        if(!item) isExist.cartItem.push(req.body)
            clcTotalPrice(isExist)
            
            let totalPrice = 0;
        isExist.cartItem.forEach(item =>{
            totalPrice += item.quantity * item.price
        })
       

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
// * remove Item From Cart
export const removeItemFromCart = catchError(async(req,res,next)=>{

    let cart = await Cart.findOneAndUpdate(  
        { userRef: req.user._id },  
        { $pull: { cartItem: {_id:req.params.id} } },  
        { new: true }  
    ); 
    if (!cart) {
        return next(new appError('Cart not found', 404));
    }  
    console.log("req.user._id", req.user._id);
    console.log("req.user._id", req.params.id);
    

    clcTotalPrice(cart)
    res.json({ message: "deleted", cart })
})

// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * remove Quantity Item From Cart
export const removeQuantityItemFromCart = catchError(async (req, res, next) => {

    const cart = await Cart.findOne({ userRef: req.user._id });

    // If the cart does not exist, handle the error  
    if (!cart) {
        return next(new appError('Cart not found', 404));
    }

    // Find the item in the cart  
    const itemIndex = cart.cartItem.findIndex(item => item._id.toString() === req.params.id);

    // If the item is not found in the cart, handle the error  
    if (itemIndex === -1) {
        return next(new appError('Item not found in cart', 404));
    }

    // Reduce the quantity for the found item  
    if (cart.cartItem[itemIndex].quantity > 1) {
        cart.cartItem[itemIndex].quantity -= 1; // Decrease quantity by 1  
    } else {
        // If the quantity is 1, remove the item from the cart entirely  
        cart.cartItem.splice(itemIndex, 1);
    }

    // Recalculate the total price after update  
    clcTotalPrice(cart);

    // Save the updated cart  
    await cart.save();

    // Respond with the updated cart  
    res.json({ message: "Item quantity updated", cart });
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



