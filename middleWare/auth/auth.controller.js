import jwt from "jsonwebtoken";
import { User } from "../../modules/users/users.model.js";
import { catchError } from "../errorHandling/catchError.js";
import bcrypt  from 'bcrypt';
import { appError } from "../errorHandling/appError.js";




export const signup = catchError(async(req,res,next)=>{
    let user = new User(req.body)
    await user.save()
    let authorization = jwt.sign({userId:user._id , role: user.role ,isBlocked: user.isBlocked, isActive:user.isActive}, process.env.JWT_KEY)
    res.json({message:'sign up done!', authorization})

})
export const signin = catchError(async(req,res,next)=>{
    let user = await User.findOne({email:req.body.email})
    if(user && bcrypt.compareSync(req.body.password, user.password)){
        let authorization = jwt.sign({userId:user._id , role: user.role ,isBlocked:user.isBlocked, isActive:user.isActive}, process.env.JWT_KEY)
        return res.json({message:'signip done!', authorization})   
    }
    next(new appError("incorrect Email or password",401))
})


export const changePassword = catchError(async(req,res,next)=>{
    let user = await User.findOne({email:req.body.email})

    if(user && bcrypt.compareSync(req.body.oldPassword, user.password)){

        await User.findOneAndUpdate({email:req.body.email},{password: req.body.newPassword , passwordChangedAt:Date.now()})
        let authorization = jwt.sign({userId:user._id , role: user.role ,isBlocked:user.isBlocked, isActive:user.isActive}, process.env.JWT_KEY)
        return res.json({message:'change password done!', authorization})   
    }
    next(new appError("incorrect Email or password",401))

})

export const protectedRoute = catchError(async(req,res,next)=>{
    let {authorization} = req.headers
    let userPayload = null
    if(!authorization) return next(new appError('token is provided',404))

        jwt.verify(authorization , 'salsabeel', (err , payload)=>{
            if(err) return next(new appError(err,401))
                userPayload = payload
                // console.log("payload",payload);
                
        })
        let user = await User.findById(userPayload.userId)
        if(!user) return next(new appError('user not found',404))
            if(user.passwordChangedAt){
                let time = parseInt(user.passwordChangedAt.getTime() / 1000)
        if(time > userPayload.iat) return next(new appError('invalid token .. log in again', 401)) 
            }
            req.user = user
            next()
        

    // * check token ? exist or not
    // * verify token 
    // * check userId
    // * token valid

})

 export const allowedTo = (...roles)=>{
    
    return catchError(async(req,res,next)=>{
        if(roles.includes(req.user.role))
            return next()
        return next(new appError('you dont have permission to perform this endpoint',401))
})}

