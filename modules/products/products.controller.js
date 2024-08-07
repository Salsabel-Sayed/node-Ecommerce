import slugify from "slugify";

import { appError } from "../../middleWare/errorHandling/appError.js";
import { catchError } from "../../middleWare/errorHandling/catchError.js";
import { Product } from "./products.model.js";
import { deleteOne, getSpecfic } from "../handler/handler.js";
import {  ApiFeatures } from './../../utils/apiFeatures.js';

// * add products
export const addProduct = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  req.body.imageCover = req.files.imageCover[0].filename;
  req.body.images = req.files.images.map((img) => img.filename);
  let product = new Product(req.body);
  await product.save();

  res.json({ message: "added", product });
});

// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * get All products

export const getAllProducts = catchError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(Product.find(), req.query).pagination().fields().filter().search().sort()
  let products = await apiFeatures.dbQuery

  products || next(new appError("product not found", 404));
  !products || res.json({ message: "get all",searching:apiFeatures.searchQuery ,products });
});
// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * get product

export const getProducts = getSpecfic(Product);
// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * update products

export const updateProducts = catchError(async (req, res, next) => {
  let product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  product || next(new appError("product not found", 404));
  !product || res.json({ message: "updated", product });
});
// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * delete products

export const deleteProducts = deleteOne(Product);
