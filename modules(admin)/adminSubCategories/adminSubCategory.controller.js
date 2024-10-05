import slugify from "slugify"
import { catchError } from "../../middleWare/errorHandling/catchError.js";
import { appError } from "../../middleWare/errorHandling/appError.js";
import {adminDeleteOne, adminGetSpecfic } from './../../modules/handler/adminHandler.js';
import { SubCategory } from "../../modules/subCategories(user)/subCategories.model.js";






// admin categories
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmVlOTU5MWRkOTFjZWE3YjgxNWMzOGYiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluM0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQwNCRLemlERGVWTVlpVDhZWTBmeHlGMjJleUdpNXI1N0lFb1JqOUJWOENWSEMvT2ZKQ3lUM2ZBdSIsImlzQWN0aXZlIjpmYWxzZSwiaWF0IjoxNzI2OTExODg5fQ.B9nI0ge-LFW7HlzMCSENOtWzQfRBBGMuEkc4c-0O6VU

// * add subCategories

export const adminAddSubCategory = catchError(async (req, res, next) => {
    // const { categoryName } = req.body;
    req.body.slug = slugify(req.body.subCategoryName)

    const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
        folder: "categoryImages/userResume",
    }).catch((err) => {
        console.log("Cloudinary upload error:", err); // Better logging  
        return null;
    });
    const { secure_url, public_id } = uploadResponse;
    if (!uploadResponse) {
        return next(new appError("File upload failed", 500));
    }
    req.body.image = uploadResponse

    const category = await SubCategory.create({
        subCategoryName: req.body.subCategoryName,  // Use the extracted categoryName directly  
            // slug: req.body.subCategoryName, // Use the slug created from categoryName  
        image: { secure_url, public_id },
        createdBy: req.user._id // Assigning the createdBy field  
    });
    res.status(201).json({ data: category });
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
    req.body.slug = slugify(req.body.subCategoryName)
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
    // existingCategory.subCategoryName = subCategoryName ?? existingCategory.subCategoryName; // Update name if provided  
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

