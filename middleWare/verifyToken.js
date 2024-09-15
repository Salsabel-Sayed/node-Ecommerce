
import jwt from "jsonwebtoken";
import { catchError } from "./errorHandling/catchError.js";
import { appError } from "./errorHandling/appError.js";


export const verifyToken = catchError(async (req, res, next) => {
    const token = req.header("authorization");
    console.log("token:",token);
    
    jwt.verify(token, "ecommerceforbackandfront", async (err, decoded) => {
        if (err) return next(new appError("No token provided", 401));
        req.user = decoded;
        console.log("decoded",decoded);
        
        next();
    });
});
