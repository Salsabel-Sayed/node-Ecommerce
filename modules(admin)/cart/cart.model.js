
import { model, Schema, Types} from "mongoose";


const cartSchema = new Schema({
    userRef:{
        type:Types.ObjectId,
        ref:"User"
    },
    cartItem:[{
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
    totalCartPrice:Number,
    discount:Number,
    totalCartAfterDiscount:Number
})

export const Cart =model('Cart', cartSchema)