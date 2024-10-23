
import jwt from "jsonwebtoken";
import { catchError } from "./errorHandling/catchError.js";
import { appError } from "./errorHandling/appError.js";
// import { User } from "../modules(admin)/users(admin)/users.model.js";



export const verifyToken = catchError(async (req, res, next) => {
    const token = req.header("authorization");
    console.log("token:",token);
    jwt.verify(token, "ecommerceforbackandfront", async (err, decoded) => {
        if (err) return next(new appError("No token provided", 401));
        // const user = await User.findById(decoded.userId);
        // if (!user || user.currentToken !== token) {
        //     return next(new appError('Invalid or expired token', 403));
        // }
        req.user = decoded;
        console.log("decoded",decoded);
        
        next();
    });
});
