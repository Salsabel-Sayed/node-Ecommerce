import { Brand } from "./brands.model.js";
import { userGetAllBrand, userGetSpecfic } from "../handler/handler(user).js";


// * get Brand
export const getBrand = userGetSpecfic(Brand)


// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * get all Brand
export const getAllBrand = userGetAllBrand(Brand)
