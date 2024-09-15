import { model, Schema, Types } from "mongoose";
import  bcrypt  from 'bcrypt';



const userSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique: [true, "email is required"],
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required: true,
        unique:true
    },
    role:{
        type:String,
        enum:['user','admin','mgr']
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    isActive:{
        type:Boolean,
        default:false
    },
    passwordChangedAt:Date,
    confirmEmail:{
        type:Boolean,
        default:false
    },
    wishList:[{
        type:Types.ObjectId,
        ref:'Product'
    }],
    addresses:[{
        city:String,
        phone:String,
        street:String
    }],
    otp: String,
    // otpExpires:Date
    
})
userSchema.pre('save',function(){
    this.password =bcrypt.hashSync(this.password, 3)
})

userSchema.pre('findOneAndUpdate',function(){
    if(this._update.password )this._update.password =bcrypt.hashSync(this._update.password, 3)
})

export const User = model('User', userSchema)