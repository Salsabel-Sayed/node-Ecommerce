
import cloudinary from "../../utils/cloudinary.js"
import { appError } from "../../middleWare/errorHandling/appError.js";
import { catchError } from "../../middleWare/errorHandling/catchError.js";
import { Brand } from "../../modules/brands(user)/brands.model.js";
import { adminDeleteOne, adminGetAll, adminGetSpecfic } from "../../modules/handler/adminHandler.js";

// admin category
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmVlOTU5MWRkOTFjZWE3YjgxNWMzOGYiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluM0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQwNCRLemlERGVWTVlpVDhZWTBmeHlGMjJleUdpNXI1N0lFb1JqOUJWOENWSEMvT2ZKQ3lUM2ZBdSIsImlzQWN0aXZlIjpmYWxzZSwiaWF0IjoxNzI2OTExODg5fQ.B9nI0ge-LFW7HlzMCSENOtWzQfRBBGMuEkc4c-0O6VU
// * add brand
export const addBrand = catchError(async (req, res, next) => {
    const  {brandName}  = req.body;
    if (!brandName || typeof brandName !== 'string') {
        return next(new appError("Valid brand name is required", 400));
    } 
    const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
        folder: "BrandImages/image",
    }).catch((err) => {
        console.log("Cloudinary upload error:", err);   
        return null;
    });
    const { secure_url, public_id } = uploadResponse;
    if (!uploadResponse) {
        return next(new appError("File upload failed", 500));
    }
    req.body.image = uploadResponse

    const brand = new Brand({
        brandName,
        image: { secure_url, public_id },
        createdBy: req.user._id 
    });


    const savedBrand = await brand.save();  
    res.status(201).json({ data: savedBrand });
})

// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * update brand
export const updateBrand = catchError(async (req, res, next) => {
    const { id } = req.params;
    const { brandName } = req.body;
    // Find the existing Brand  
    const existingBrand = await Brand.findById(id);
    if (!existingBrand) {
        return next(new appError('Brand not found', 404));
    }
    let imageData = existingBrand.image;
    if (req.file) {
        await cloudinary.uploader.destroy(imageData.public_id)
        const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
            folder: 'BrandImages'
        });
        imageData = {
            secure_url: uploadResponse.secure_url,
            public_id: uploadResponse.public_id
        };
    }
    existingBrand.brandName = brandName ?? existingBrand.brandName; // Update name if provided  
    existingBrand.image = imageData; // Update image   
    const updatedBrand = await existingBrand.save();
    res.status(200).json({
        message: "Brand updated successfully",
        Brand: updatedBrand
    });
})

// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * delete brand
export const deleteBrand = adminDeleteOne(Brand)


// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// *  get all Brands
export const getAllBrand = adminGetAll(Brand)

// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// *  get Specfic Brand
export const getBrand = adminGetSpecfic(Brand)


