import { catchError } from "../errorHandling/catchError.js";
import bcrypt  from 'bcrypt';
import { appError } from "../errorHandling/appError.js";
import {html, sendEmail } from "../../utils/sendEmail.js";
import { nanoid } from "nanoid";
import  jwt  from 'jsonwebtoken';
import { User } from "../../modules(admin)/users(admin)/users.model.js";



export const signup = catchError(async (req, res, next) => {
    try {
        const user = new User(req.body);
        await bcrypt.hash(req.body.password, 8);  
        await user.save();

        const otp = nanoid(6); // Generate a 6-character OTP  
        user.otp = otp;
        await user.save(); // Save the OTP in the user document  

        await sendEmail({
            to: user.email,
            subject: "Your OTP Code",
            html: `<p>Your OTP code is <strong>${otp}</strong></p>`
        });

        res.json({ message: "Please check your email for the OTP." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    } 
})

// ? ////////////////////////////////////////////////////////////////////////////////////
export const verifyOtp = async (req, res, next) => {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }

    if (user.otp === otp) {
        user.isActive = true; // Mark the user as active  
        // user.otp = null; // Clear the OTP after verification  
        let authorization = jwt.sign({
            userId: user._id,
            email: user.email,
            passwrod:user.password,
            role: user.role,
            isActive: user.isActive
        },"ecommerceforbackandfront");
        // user.currentToken = authorization;
        await user.save();

        res.json({ message: "OTP verified! Signup complete.", authorization });
    } else {
        return next(new appError("Invalid OTP.",404))
    }
};

// ? ////////////////////////////////////////////////////////////////////////////////////
export const signin = catchError(async (req, res, next) => {
    const { email, password} = req.body;
    const userId = req.user.userId
    console.log("userId", userId);
    
    const userExist = await User.findOne({email});
    if(!userExist) return next(new appError("User not found",404))

    const isPasswordValid = bcrypt.compare(password, userExist.password);
    if (!isPasswordValid) return next(new appError("Invalid password!", 404));
    
    if (userExist.email !== email) return next(new appError("invalid email or password!", 404));
    
    const activeState = await User.updateOne({ _id: userId }, { isActive: true }); 
    console.log("activeState", activeState);
    
    let authorization = jwt.sign({
        userId: userExist._id,
        email: userExist.email,
        passwrod: userExist.password,
        role: userExist.role,
        isActive: userExist.isActive
        },"ecommerceforbackandfront");
    // userExist.currentToken = authorization;
    await userExist.save();
    
    return res.json({ message: "signed in successfully", authorization });
});
// ? ////////////////////////////////////////////////////////////////////////////////////
// * log out 
export const logout = catchError(async (req, res, next) => {
    const userId = req.user.userId
    const userExist = await User.findById(userId);
    console.log("userExist", userExist);
    
    if (!userExist) {
        return next(new appError("User not found!", 404));
    }  
    const userFalseActive = await User.updateOne({ _id: userId }, { isActive: false });
    console.log("userFalseActive", userFalseActive);

    if (userFalseActive.modifiedCount === 0) {
        return next(new appError('Failed to log out, please try again.', 500));
    } 
    // userExist.currentToken = null;
    await userExist.save();

    return res.json({ message: "logged out successfully" });
})

// ? ////////////////////////////////////////////////////////////////////////////////////
// * otp msg to email (request otp and update password)

export const requestUpdatePassword = catchError(async (req, res, next) => {
    const user = await User.findOne({ _id: req.user.userId });
    console.log("user",user);
    

    if (!user) return next(new appError("user not found", 404));

    const otp = nanoid(6)
    user.otp = otp;
    //  user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();
    const html1 = html(otp)
    sendEmail({ to: user.email, subject: "otp", html: html1 })
    return res.json({ message: "check email" })
});
// ? ////////////////////////////////////////////////////////////////////////////////////
export const updatePassword = catchError(async (req, res, next) => {
    const { otp, newPassword } = req.body;
    const user = await User.findById(req.user.userId);
    if (!user) return next(new appError("User not found", 404));
    if (!user.otp || user.otp !== otp) {
        return next(new appError('Invalid or expired OTP.', 400));
    }
    // Check if newPassword is valid  
    if (newPassword.length < 3) {
        return next(new appError("Password must be at least 3 characters", 400));
    }
    user.password = newPassword;

    await user.save();
    let authorization = jwt.sign({
        userId: user._id,
        email: user.email,
        password: user.password,
        role: user.role,
        isActive: user.isActive
    }, "ecommerceforbackandfront");

    // const updatedPass = await User.updateOne({ _id: user._id }, { isActive: true })
    // Clear OTP after successful update 
    user.otp = undefined;
    // user.currentToken = authorization;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully!", authorization});
});

// ? ////////////////////////////////////////////////////////////////////////////////////
// * update user
export const updateUser = catchError(async (req, res, next) => {
    const userId = req.user.userId;

    const findUser = await User.findOne({
        $or: [{ email: req.body.email }, { phone: req.body.phone }],
        id: { $ne: userId },
    });
    console.log("findUser",findUser);
    

    if (findUser.id.toString() !== userId) {
        return next(new appError("another user info!!", 404));
    }
    if (findUser.id.toString() == userId && findUser.email) {
        if (findUser.status === "offline") return next(new appError("cant update cause u r offline", 404))
        const updated = await User.updateOne({ _id: userId }, req.body);

        let authorization = jwt.sign({
            userId: findUser._id,
            email: findUser.email,
            password: findUser.password,
            role: findUser.role,
            isActive: findUser.isActive
        }, "ecommerceforbackandfront");
        // findUser.currentToken = authorization;
        await findUser.save();
        res.json({ message: "Done!", updated, authorization });
    }
});

// ? //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * delete user (only user can delete)

export const deleteUser = catchError(async (req, res, next) => {
    const userId = req.user.userId;
    console.log("userId",userId);
    
    const userFind = await User.findById( userId );
    console.log("userFind",userFind);
    
    
    if (!userFind) return next(new appError("user not found", 404));
    if (userFind.isActive === false) return next(new appError("user offline !!! "))
    const user = await User.findByIdAndDelete(userId );
    res.json({ message: "delete", user });
});
// ? ////////////////////////////////////////////////////////////////////////////////////
// * get user profile

export const getUser = catchError(async (req, res, next) => {
    const admin = await User.findOne({ _id: req.user.userId });
    if (!admin) return next(new appError("user not found", 404));
    const user = await User.findById(req.user.userId);
    res.json({ message: "get user profile ", user })
});





