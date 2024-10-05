import { SubCategory } from "./subCategories.model.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";
import { catchError } from "../../middleWare/errorHandling/catchError.js";
import { appError } from "../../middleWare/errorHandling/appError.js";
import { userGetSpecfic } from "../handler/handler(user).js";




// * get All subCategories

export const getAllSubCategories = catchError(async (req, res, next) => {
    let filterObj = {}
    if (req.params.category) filterObj.categoryIdRef = req.params.category
    let apiFeatures = new ApiFeatures(SubCategory.find(filterObj), req.query).pagination().fields().filter().search().sort()
    let subCategories = await apiFeatures.dbQuery

    subCategories || next(new appError('subCategory not found', 404))
    !subCategories || res.json({ message: "get all", searching: apiFeatures.searchQuery, subCategories })
})
// ? ////////////////////////////////////////////////////////////////////////////////////////////////
// * get subCategories


export const getSubCategories = userGetSpecfic(SubCategory)