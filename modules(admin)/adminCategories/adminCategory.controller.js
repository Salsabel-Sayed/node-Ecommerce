import slugify from "slugify"

import cloudinary from "../../utils/cloudinary.js"
import { appError } from "../../middleWare/errorHandling/appError.js";
import { catchError } from "../../middleWare/errorHandling/catchError.js";

import { Category } from './../../modules/categories(user)/categories.model.js';
import { adminDeleteOne, adminGetAll, adminGetSpecfic } from "../../modules/handler/adminHandler.js";





// admin categories
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmVlOTU5MWRkOTFjZWE3YjgxNWMzOGYiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluM0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQwNCRLemlERGVWTVlpVDhZWTBmeHlGMjJleUdpNXI1N0lFb1JqOUJWOENWSEMvT2ZKQ3lUM2ZBdSIsImlzQWN0aXZlIjpmYWxzZSwiaWF0IjoxNzI2OTExODg5fQ.B9nI0ge-LFW7HlzMCSENOtWzQfRBBGMuEkc4c-0O6VU
// * add Categories
export const addCategory = catchError(async (req, res, next) => {
    const { categoryName } = req.body;

    // Validate categoryName  
    if (!categoryName || typeof categoryName !== 'string') {
        return next(new appError("Valid category name is required", 400));
    } 

    // Upload image to Cloudinary  
    const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
        folder: "categoryImages/image",
    }).catch((err) => {
        console.log("Cloudinary upload error:", err);
        return null;
    });

    if (!uploadResponse) {
        return next(new appError("File upload failed", 500));
    }

    const { secure_url, public_id } = uploadResponse;

    // Validate secure_url and public_id  
    if (!secure_url || !public_id) {
        return next(new appError("Image upload failed, no URL or public ID", 500));
    }

    // Check if category already exists  
    const existingCategory = await Category.findOne({ categoryName });
    if (existingCategory) {
        return next(new appError("Category already exists", 400));
    }

    // Create new category  
    const category = new Category({
        categoryName,
        image: { secure_url, public_id },
        createdBy: req.user._id
    });

    const savedCategory = await category.save();
    res.status(201).json({ data: savedCategory });
});

// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * update Categories

export const updateCategories = catchError(async (req, res, next) => {
    const { id } = req.params; 
    const { categoryName } = req.body; 
    // Find the existing category  
    const existingCategory = await Category.findById(id);
    if (!existingCategory) {
        return next(new appError('Category not found', 404));
    }
    let imageData = existingCategory.image;  
    if (req.file) {await cloudinary.uploader.destroy(imageData.public_id) 
        const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
            folder: 'categoryImages'
        });
        imageData = {
            secure_url: uploadResponse.secure_url,
            public_id: uploadResponse.public_id
        };
    }
    existingCategory.categoryName = categoryName ?? existingCategory.categoryName; // Update name if provided  
    existingCategory.image = imageData; // Update image   
    const updatedCategory = await existingCategory.save();
    res.status(200).json({
        message: "Category updated successfully",
        category: updatedCategory
    });
}
)
// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * get All Categories

export const getAllCategories = adminGetAll(Category)
// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// *  get Specfic category

export const getCategories = adminGetSpecfic(Category)
// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * delete Categories

export const deleteCategories = adminDeleteOne(Category)

