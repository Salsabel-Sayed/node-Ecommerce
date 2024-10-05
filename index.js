process.on('uncaughtException', (err) => {
    console.log('error in code', err);
})
import express from 'express';
import {dbConnect} from "./dataBase/dbConnection.js"
import {appError} from "./middleWare/errorHandling/appError.js"
import { globalError } from './middleWare/errorHandling/globalError.js';
import { bootstrap } from './modules/bootstrap.js';
import cors from "cors"
import { catchError } from './middleWare/errorHandling/catchError.js';
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51Pl5iHEYCGyae2RjXyrJgvfmVMud1o8GOmoE7UwfODvc0SzwTPWMpZ4Q5Lmh9Xj35jMItglZB0SWcLmPDiXvsuJ000VviDAMoQ');

import dotenv from "dotenv"
import { Orders } from './modules/order/order.model.js';
import { User } from './modules/users/users.model.js';
import { Cart } from './modules/cart/cart.model.js';
import { Product } from './modules/products/products.model.js';
dotenv.config()

// import "dotenv/config"
const app = express()
const port =process.env.PORT || 3000

app.post('/api/webhook', express.raw({type: 'application/json'}), catchError(async(req, res) => {
    const sig = req.headers['stripe-signature'].toString()
  
     let event = stripe.webhooks.constructEvent(req.body, sig, "whsec_iv60u28o7HMW1rkaSxRviH5ynpOiRIuO");
    
  let checkout;
    // Handle the event
    if(event.type == "checkout.session.completed"){
        checkout =event.data.object;

        let user = await User.findOne({email:checkout.customer_email})
        let cart = await Cart.findById(checkout.client_reference_id)
    if(!cart) return next(new appError('cart not found',404))
    let order = new Orders({
        userRef:user._id,
        orderItem:cart.cartItem,
        shippingAdress:checkout.metadata,
        totalOrderPrice:checkout.amount_total/100,
        paymentType: 'card',
        isPaid: true

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

    }
    res.json({message:"success",checkout});
  }));
app.use(cors())
app.use(express.json())
// app.use('/uploads',express.static('uploads'))

bootstrap(app)
app.use('*',(req,res,next)=>{
    next(new appError(`route not found ${req.originalUrl}`, 404))
})

app.use(globalError)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))   