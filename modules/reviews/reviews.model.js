import { model, Schema, Types } from "mongoose";


const reviewsSchema = new Schema({
    comment:String,
    userIdRef:{
        type:Types.ObjectId,
        ref:'User'
    },
    productIdRef:{
        type:Types.ObjectId,
        ref:'Product'
    },
    rate:{
        type:Number,
        min:0,
        max:5
    }
})

reviewsSchema.pre('findOne', function(){
    this.populate('userIdRef', 'name')
})

export const Reviews =model('Reviews', reviewsSchema)