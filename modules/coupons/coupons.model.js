import { model, Schema   } from "mongoose";


const couponsSchema = new Schema({
    discount:Number,
    expires:Date,
    code:String,
})

export const Coupons =model('Coupons', couponsSchema)