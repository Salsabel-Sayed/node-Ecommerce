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
dotenv.config()

// import "dotenv/config"
const app = express()
const port =process.env.PORT || 3000

app.post('/api/webhook', express.raw({type: 'application/json'}), catchError((req, res) => {
    const sig = req.headers['stripe-signature'].toString()
  
     let event = stripe.webhooks.constructEvent(req.body, sig, "whsec_iv60u28o7HMW1rkaSxRviH5ynpOiRIuO");
    
  let checkout;
    // Handle the event
    if(event.type == "checkout.session.completed"){
        checkout =event.data.object
    }
    res.json({message:"success",checkout});
  }));
app.use(cors())
app.use(express.json())
app.use('/uploads',express.static('uploads'))

bootstrap(app)
app.use('*',(req,res,next)=>{
    next(new appError(`route not found ${req.originalUrl}`, 404))
})

app.use(globalError)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))   