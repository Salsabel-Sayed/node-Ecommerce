import { appError } from "../../middleWare/errorHandling/appError.js";
import { catchError } from "../../middleWare/errorHandling/catchError.js";
import { User } from "../users(admin)/users.model.js";



// * add adress
export const addToadresses = catchError(async(req,res,next)=>{
    
    const userId = req.user._id  
    const {street,city,phone} = req.body
    console.log("userId",userId);
    console.log("street",street);

    if (!street || !city || !phone) {
        return next(new appError('Invalid address data', 400));
    } 
    const findUser = await User.findOne({_id:userId})
    console.log("findUser",findUser);
    
    if (!findUser) {
        return next(new appError('User not found', 404));
    } 
    const addressExists = findUser.addresses.some((addr) =>
        addr.street === street && addr.city === city && addr.phone === phone); 
    if (addressExists) {
        return next(new appError('Address already exists', 400));
    }
    const addAdress =findUser.addresses.push(req.body); // Assuming req.body contains the entire address object  
    await findUser.save(); 

    res.json({ message: "Address added", addresses: addAdress });
})

// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * remove adress
export const removeAdresses = catchError(async(req,res,next)=>{
    const userId = req.user._id
    const adressId = req.params.id
    console.log("adressId", adressId);
    
    
    let findUserAdress = await User.findOne({_id:userId})
    console.log("findUserAdress", findUserAdress);
    
    if(!findUserAdress) return next(new appError("user not found",400))
    const adressIndex = findUserAdress.addresses.findIndex((addr) => addr._id.toString() === adressId);
    console.log("adressIndex", adressIndex);
    
    if (adressIndex === -1) return next(new appError("adress not found", 400))

    const deletedAddress = findUserAdress.addresses.splice(adressIndex, 1)[0];
    await findUserAdress.save();  

    res.json({ message: "deleted", address: deletedAddress })
})

// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * get all user Adress
export const getAllAdresses= catchError(async(req,res,next)=>{
    
    

    const allUsers = await User.find().populate("addresses")

    const allAddresses = [];

    // Iterate through each user and their addresses  
    allUsers.forEach(user => {
        user.addresses.forEach(address => {
            allAddresses.push({
                adress: address,
                userId: user._id,      // User ID  
            });
        });
    });  

    res.json({ message: "get all adresses", allAdresses: allAddresses })
})

