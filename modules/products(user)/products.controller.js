// import { appError } from '../../middleWare/errorHandling/appError.js';
// import { catchError } from '../../middleWare/errorHandling/catchError.js';
// import { adminDeleteOne, adminGetAll, adminGetSpecfic } from '../handler/adminHandler.js';
// import { Product } from './products.model.js';




// // admin category
// // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmVlOTU5MWRkOTFjZWE3YjgxNWMzOGYiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluM0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQwNCRLemlERGVWTVlpVDhZWTBmeHlGMjJleUdpNXI1N0lFb1JqOUJWOENWSEMvT2ZKQ3lUM2ZBdSIsImlzQWN0aXZlIjpmYWxzZSwiaWF0IjoxNzI2OTExODg5fQ.B9nI0ge-LFW7HlzMCSENOtWzQfRBBGMuEkc4c-0O6VU
// // * add Product
// export const addProduct = catchError(async (req, res, next) => {
//   const { productTitle } = req.body;

//   if (!productTitle || typeof productTitle !== 'string') {
//     return next(new appError("Valid Product name is required", 400));
//   }

//   // Upload Cover Image  
//   let coverImageResponse;
//   if (req.files.coverImage) {
//     coverImageResponse = await cloudinary.uploader.upload(req.files.coverImage[0].path, {
//       folder: "ProductImages/cover", // Specify folder for cover images  
//     }).catch((err) => {
//       console.log("Cloudinary upload error for cover image:", err);
//       return null;
//     });

//     if (!coverImageResponse) {
//       return next(new appError("Cover image upload failed", 500));
//     }
//   }

//   // Upload Additional Images  
//   const additionalImages = [];
//   if (req.files.images) {
//     for (const file of req.files.images) {
//       const uploadResponse = await cloudinary.uploader.upload(file.path, {
//         folder: "ProductImages/additional", // Specify folder for additional images  
//       }).catch((err) => {
//         console.log("Cloudinary upload error for additional images:", err);
//         return null;
//       });

//       if (!uploadResponse) {
//         return next(new appError("One or more images upload failed", 500));
//       }

//       additionalImages.push({
//         secure_url: uploadResponse.secure_url,
//         public_id: uploadResponse.public_id
//       });
//     }
//   }

//   const Product = new Product({
//     productTitle,
//     coverImage: {
//       secure_url: coverImageResponse.secure_url,
//       public_id: coverImageResponse.public_id
//     },
//     images: additionalImages, // Store array of additional images  
//     createdBy: req.user._id
//   });

//   const savedProduct = await Product.save();
//   res.status(201).json({ data: savedProduct });
// });

// // ? ////////////////////////////////////////////////////////////////////////////////////////////////
// // * update Product
// // export const updateProduct = catchError(async (req, res, next) => {
// //   const { id } = req.params;
// //   const { brandName } = req.body;
// //   // Find the existing Brand  
// //   const existingBrand = await Brand.findById(id);
// //   if (!existingBrand) {
// //     return next(new appError('Brand not found', 404));
// //   }
// //   let imageData = existingBrand.image;
// //   if (req.file) {
// //     await cloudinary.uploader.destroy(imageData.public_id)
// //     const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
// //       folder: 'BrandImages'
// //     });
// //     imageData = {
// //       secure_url: uploadResponse.secure_url,
// //       public_id: uploadResponse.public_id
// //     };
// //   }
// //   existingBrand.brandName = brandName ?? existingBrand.brandName; // Update name if provided  
// //   existingBrand.image = imageData; // Update image   
// //   const updatedBrand = await existingBrand.save();
// //   res.status(200).json({
// //     message: "Brand updated successfully",
// //     Brand: updatedBrand
// //   });
// // })

// // ? ////////////////////////////////////////////////////////////////////////////////////////////////
// // * delete Product
// export const deleteProduct = adminDeleteOne(Product)


// // ? ////////////////////////////////////////////////////////////////////////////////////////////////
// // *  get all Products
// export const getAllProduct = adminGetAll(Product)

// // ? ////////////////////////////////////////////////////////////////////////////////////////////////
// // *  get Specfic Product
// export const getProduct = adminGetSpecfic(Product)


