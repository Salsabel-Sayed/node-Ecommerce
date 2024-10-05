import { appError } from "../errorHandling/appError.js"
import { catchError } from "../errorHandling/catchError.js"

// * allow specific user role
export const allowedTo = (...roles) => {

    return catchError(async (req, res, next) => {
        
        if (roles.includes(req.user.role))
            return next()
        return next(new appError(`${req.user.role} dont have permission to perform this endpoint`, 401))
    })
}