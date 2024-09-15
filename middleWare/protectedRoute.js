import { User } from "../modules/users/users.model.js"
import { appError } from "./errorHandling/appError.js"
import { catchError } from "./errorHandling/catchError.js"
import  jwt  from 'jsonwebtoken';

export const protectedRoute = catchError(async (req, res, next) => {
    let { authorization } = req.headers
    let userPayload = null
    if (!authorization) return next(new appError('token is provided', 404))

    jwt.verify(authorization, 'ecommerceforbackandfront', (err, payload) => {
        if (err) return next(new appError(err, 401))
        userPayload = payload
        // console.log("payload",payload);

    })
    let user = await User.findById(userPayload.userId)
    if (!user) return next(new appError('user not found', 404))
    if (user.passwordChangedAt) {
        let time = parseInt(user.passwordChangedAt.getTime() / 1000)
        if (time > userPayload.iat) return next(new appError('invalid token .. log in again', 401))
    }
    req.user = user
    next()


})