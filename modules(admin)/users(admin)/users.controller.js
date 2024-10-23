
import { appError } from "../../middleWare/errorHandling/appError.js"
import { catchError } from '../../middleWare/errorHandling/catchError.js';
import { nanoid } from "nanoid";
import {html, sendEmail } from "../../utils/sendEmail.js";
import  bcrypt  from 'bcrypt';
import  jwt  from 'jsonwebtoken';
import { ApiFeatures } from "../../utils/apiFeatures.js";
import { adminDeleteOne, adminGetSpecfic } from "../../modules/handler/adminHandler.js";
import { User } from "./users.model.js";

// token admin
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzE0ZTQ3YjdjMzAyYTRhYmU3ZDU4YzIiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluNUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQwNCR6eDBBS3RSa2twUno2ZURGcFhkM1p1M2VNRmpMOExmNEV2VUpoUkMzb01PdktXQ2o5SW9aSyIsImlzQWN0aXZlIjpmYWxzZSwiaWF0IjoxNzI5NDIyNDU5fQ.YUtK1GpVwZq8VcCNk5Stol3n3Xo4efCSeGoIrJfqa_Q

// * add admin account
export const addAdmin = catchError(async (req, res, next) => {
    const ownerId = req.user._id
    console.log("ownerId", ownerId);
    
    const { name, email, password,phone } = req.body
    const findOwnerId = await User.findById(ownerId)
    console.log("findOwnerId", findOwnerId._id.toString());
    if (!findOwnerId) return next(new appError("u r not owner"))
    if (findOwnerId.role === "owner" && ownerId === findOwnerId._id.toString()){
        const hashPass = await bcrypt.hash(password, 3)
        const admin = await User.create({ name, email, password: hashPass, phone,role: "admin" })
        const token = jwt.sign({
            _id: admin.id,
            role: admin.role,
            email: admin.email,
            password: admin.password,
            isActive: admin.isActive
        }, "ecommerceforbackandfront")
        res.status(201).json({ message: "admin created", admin, token })
    }
})
    
// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * get All users (admin)
export const getAllUser = catchError(async(req,res,next)=>{
    const adminId = req.user._id
    const findAdmin = await User.findById(adminId)
    if (!findAdmin) return next(new appError("cant found admin",404))
        if(findAdmin.role !== "admin") return next(new appError("u r not admin !",404))
            if(findAdmin.role === "admin"){
                let apiFeatures = new ApiFeatures(User.find(), req.query).pagination().fields().filter().search().sort()

                let user = await apiFeatures.dbQuery
                user || next(new appError('user not found', 404))
                !user || res.json({ message: "get all", searching: apiFeatures.searchQuery, user })
            }
})
// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * get user(admin)
export const adminGetUser = adminGetSpecfic(User)

// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * update user(admin)
export const updateUser = catchError(async(req,res,next)=>{
    const adminId = req.user._id
    const findAdmin = await User.findById(adminId)
    if (!findAdmin) return next(new appError("cant found admin", 404))
    if (findAdmin.role !== "admin") return next(new appError("u r not admin !", 404))
    if (findAdmin.role === "admin") {
        let updatedUser = await User.findByIdAndUpdate(req.params.id, req.body ,{new:true})
        updatedUser || next(new appError('updatedUser not found', 404))
        !updatedUser || res.json({ message: "updated", updatedUser })
    }
})

// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * update all users(admin)
export const adminUpdateAllUsers = catchError(async(req,res,next)=>{
    const adminId = req.user._id
    const findAdmin = await User.findById(adminId)
    if (!findAdmin) return next(new appError("cant found admin", 404))
    if (findAdmin.role !== "admin") return next(new appError("u r not admin !", 404))
    if (findAdmin.role === "admin") {
        let updateMayUsers = await User.updateMany({},req.body)
        updateMayUsers || next(new appError('updateMayUsers not found', 404))
        !updateMayUsers || res.json({ message: "updated", updateMayUsers}) 
}})

// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * delete User(admin)
export const adminDeleteUser = adminDeleteOne(User)

// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * otp msg to email
export const otpRequest = catchError(async(req,res,next)=>{
    const otp = nanoid(6)
    const user = await User.findOneAndUpdate({email:req.body.email},{otp})
    const html1 = html(otp)
    sendEmail({to:user.email,subject:"otp",html:html1})
    return res.json("check email")
})

export const checkOtp = catchError(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email,otp:req.body.otp})
    if(!user){
        return res.json("invalid otp")
    }
    await User.updateOne({email:req.body.email},{})
})