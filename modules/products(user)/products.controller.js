import { adminGetAll, adminGetSpecfic } from '../handler/adminHandler.js';
import { Product } from './products.model.js';



// *  get all Products
export const getAllProduct = adminGetAll(Product)

// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// *  get Specfic Product
export const getProduct = adminGetSpecfic(Product)


