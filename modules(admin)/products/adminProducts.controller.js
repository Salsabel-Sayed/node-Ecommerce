
import { appError } from '../../middleWare/errorHandling/appError.js';
import { catchError } from '../../middleWare/errorHandling/catchError.js';
import { adminDeleteOne, adminGetAll, adminGetSpecfic } from '../../modules/handler/adminHandler.js';
import cloudinary from '../../utils/cloudinary.js';
import { Product } from './../../modules/products(user)/products.model.js';

// admin category
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmVlOTU5MWRkOTFjZWE3YjgxNWMzOGYiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluM0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQwNCRLemlERGVWTVlpVDhZWTBmeHlGMjJleUdpNXI1N0lFb1JqOUJWOENWSEMvT2ZKQ3lUM2ZBdSIsImlzQWN0aXZlIjpmYWxzZSwiaWF0IjoxNzI2OTExODg5fQ.B9nI0ge-LFW7HlzMCSENOtWzQfRBBGMuEkc4c-0O6VU
// * add product
export const addProduct = catchError(async (req, res, next) => {
  const { productName,
    description, // Make sure to specify all your body variables  
    price,
    priceAfterDiscount,
    brandIdRef,
    categoryIdRef,
    subCategoryIdRef,
    rateCount,
    rateAvg,
    stock,   
    sold } = req.body;

  if (!productName || typeof productName !== 'string') {
    return next(new appError("Valid Product name is required", 400));
  }

  // Upload Cover Image
  let coverImageResponse;
  if (req.files.coverImage) {
    coverImageResponse = await cloudinary.uploader.upload(req.files.coverImage[0].path, {
      folder: "ProductImages/cover", // Specify folder for cover images
    }).catch((err) => {
      console.log("Cloudinary upload error for cover image:", err);
      return null;
    });

    if (!coverImageResponse) {
      return next(new appError("Cover image upload failed", 500));
    }
  }

  // Upload Additional Images
  const additionalImages = [];
  if (req.files.images) {
    for (const file of req.files.images) {
      const uploadResponse = await cloudinary.uploader.upload(file.path, {
        folder: "ProductImages/additional", // Specify folder for additional images
      }).catch((err) => {
        console.log("Cloudinary upload error for additional images:", err);
        return null;
      });

      if (!uploadResponse) {
        return next(new appError("One or more images upload failed", 500));
      }

      additionalImages.push({
        secure_url: uploadResponse.secure_url,
        public_id: uploadResponse.public_id
      });
    }
  }

  const newProduct = new Product({
    productName,
    coverImage: {
      secure_url: coverImageResponse.secure_url,
      public_id: coverImageResponse.public_id
    },
    images: additionalImages, 
    createdBy: req.user._id,
    description,  
    price,   
    priceAfterDiscount,  
    brandIdRef,  
    categoryIdRef,  
    subCategoryIdRef, 
    rateCount, 
    rateAvg,  
    stock, 
    sold,
  });

  const savedProduct = await newProduct.save();
  res.status(201).json({ data: savedProduct });
});

// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * update product
export const updateProduct = catchError(async (req, res, next) => {
  const { id } = req.params;
  const { productName } = req.body;

  // Find the existing product
  const existingProduct = await Product.findById(id);
  if (!existingProduct) {
    return next(new appError('Product not found', 404));
  }

  // Validate product name
  if (productName && typeof productName !== 'string') {
    return next(new appError("Valid Product name is required", 400));
  }

  // Upload Cover Image
  let coverImageResponse;
  if (req.files.coverImage) {
    // If there's an existing cover image, remove it from cloudinary
    if (existingProduct.coverImage && existingProduct.coverImage.public_id) {
      await cloudinary.uploader.destroy(existingProduct.coverImage.public_id);
    }

    coverImageResponse = await cloudinary.uploader.upload(req.files.coverImage[0].path, {
      folder: "ProductImages/cover",
    }).catch((err) => {
      console.log("Cloudinary upload error for cover image:", err);
      return null;
    });

    if (!coverImageResponse) {
      return next(new appError("Cover image upload failed", 500));
    }

    existingProduct.coverImage = {
      secure_url: coverImageResponse.secure_url,
      public_id: coverImageResponse.public_id
    };
  }

  // Upload Additional Images
  const additionalImages = [];
  if (req.files.images) {
    // Clear existing additional images from cloudinary if needed
    for (const img of existingProduct.images) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    for (const file of req.files.images) {
      const uploadResponse = await cloudinary.uploader.upload(file.path, {
        folder: "ProductImages/additional",
      }).catch((err) => {
        console.log("Cloudinary upload error for additional images:", err);
        return null;
      });

      if (!uploadResponse) {
        return next(new appError("One or more images upload failed", 500));
      }

      additionalImages.push({
        secure_url: uploadResponse.secure_url,
        public_id: uploadResponse.public_id
      });
    }
  }

  existingProduct.productName = productName ?? existingProduct.productName; // Update product name if provided
  existingProduct.images = additionalImages; // Update images

  const updatedProduct = await existingProduct.save();
  res.status(200).json({
    message: "Product updated successfully",
    product: updatedProduct
  });
});

// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * delete product



export const deleteProduct = adminDeleteOne(Product)


// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// *  get all products
export const getAllProduct = adminGetAll(Product)

// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// *  get Specfic product
export const getProduct = adminGetSpecfic(Product)


