import slugify from "slugify"
import { catchError } from "../../middleWare/errorHandling/catchError.js";
import { appError } from "../../middleWare/errorHandling/appError.js";
import {adminDeleteOne, adminGetSpecfic } from './../../modules/handler/adminHandler.js';
import { SubCategory } from "../../modules/subCategories(user)/subCategories.model.js";
import cloudinary from "../../utils/cloudinary.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";






// admin categories
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmVlOTU5MWRkOTFjZWE3YjgxNWMzOGYiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluM0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQwNCRLemlERGVWTVlpVDhZWTBmeHlGMjJleUdpNXI1N0lFb1JqOUJWOENWSEMvT2ZKQ3lUM2ZBdSIsImlzQWN0aXZlIjpmYWxzZSwiaWF0IjoxNzI2OTExODg5fQ.B9nI0ge-LFW7HlzMCSENOtWzQfRBBGMuEkc4c-0O6VU

// * add subCategories

export const adminAddSubCategory = catchError(async (req, res, next) => {
    const { subCategoryName } = req.body;
    console.log("subCategoryName", subCategoryName);
    

    // Validate subCategoryName  
    if (!subCategoryName || typeof subCategoryName !== 'string') {
        return next(new appError("Valid subCategory name is required", 400));
    }

    // Upload image to Cloudinary  
    const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
        folder: "subCategoryImages/image",
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
    const existingSubCategory = await SubCategory.findOne({ subCategoryName });
    if (existingSubCategory) {
        return next(new appError("Category already exists", 400));
    }

    // Create new category  
    const subCategory = new SubCategory({
        subCategoryName,
        image: { secure_url, public_id },
        createdBy: req.user._id
    });

    const savedCategory = await subCategory.save();
    res.status(201).json({ data: savedCategory });
})

// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * get All subCategories

export const adminGetAllSubCategories = catchError(async (req, res, next) => {
    let filterObj = {}
    if (req.params.category) filterObj.categoryIdRef = req.params.category
    let apiFeatures = new ApiFeatures(SubCategory.find(filterObj), req.query).pagination().fields().filter().search().sort()
    let subCategories = await apiFeatures.dbQuery

    subCategories || next(new appError('subCategory not found', 404))
    !subCategories || res.json({ message: "get all", searching: apiFeatures.searchQuery, subCategories })
})
// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * get subCategories

export const adminGetSubCategory = adminGetSpecfic(SubCategory)
// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * update subCategories

export const updateSubCategories = catchError(async (req, res, next) => {
    const { id } = req.params;
    const { subCategoryName } = req.body;
    // Find the existing sub category  
    const existingSubCategory = await SubCategory.findById(id);
    if (!existingSubCategory) {
        return next(new appError('Category not found', 404));
    }
    let imageData = existingSubCategory.image;
    if (req.file) {
        await cloudinary.uploader.destroy(imageData.public_id)
        const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
            folder: 'subCategoryImages'
        });
        imageData = {
            secure_url: uploadResponse.secure_url,
            public_id: uploadResponse.public_id
        };
    }
    existingSubCategory.subCategoryName = subCategoryName ?? existingSubCategory.subCategoryName; // Update name if provided  
    existingSubCategory.image = imageData; // Update image   
    const updatedSubCategory = await existingSubCategory.save();
    res.status(200).json({
        message: "Category updated successfully",
        category: updatedSubCategory
    });
}
)
// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * delete subCategories

export const deleteSubCategories = adminDeleteOne(SubCategory)

