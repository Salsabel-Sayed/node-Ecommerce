
import { model, Schema, Types} from "mongoose";


const orderSchema = new Schema({
    userRef:{
        type:Types.ObjectId,
        ref:"User"
    },
    orderItem:[{
        product:{
            type:Types.ObjectId,
            ref:"Product"
        },
        quantity:{
            type:Number,
            default:1,
        },
        price:Number
        
    }],
    totalOrderPrice:Number,
    shippingAdress:{
        city:String,
        street:String,
        phone:String,
    },
    paymentType:{
        type:String,
        enum:['cash', 'card'],
        default:'cash'
    },
    isPaid:{
        type:Boolean,
        default:false
    },
    paidAt:Date,
    isDelivered:{
        type:Boolean,
        default:false
    },
    deliveredAt:Date

})

export const Orders =model('Orders', orderSchema)