import { Router } from "express";


import { adminAddSubCategory, adminGetAllSubCategories, adminGetSubCategory, deleteSubCategories, updateSubCategories } from "./adminSubCategory.controller.js";
import { verifyToken } from "../../middleWare/verifyToken.js";
import { allowedTo } from './../../middleWare/validations/allowRoles.js';
import { filteration, uploadFile } from "../../utils/multers.js";




const adminSubCategoryRouter = Router({ mergeParams: true })

// adminSubCategoryRouter.route('/')
//     .post(addSubCategory)
//     .get(getAllSubCategories)

adminSubCategoryRouter.post("/addSubCategories/", verifyToken, allowedTo('admin'), uploadFile(filteration.image).single("image"), adminAddSubCategory)
adminSubCategoryRouter.get("/getAllSubCategories/", verifyToken, allowedTo('admin'), adminGetAllSubCategories)
adminSubCategoryRouter.get("/getSubCategories/:id", verifyToken, allowedTo('admin'), adminGetSubCategory)
adminSubCategoryRouter.put("/updateSubCategories/:id", verifyToken, allowedTo('admin'), uploadFile(filteration.image).single("image"), updateSubCategories)
adminSubCategoryRouter.delete("/deleteSubCategories/:id", verifyToken, allowedTo('admin'), deleteSubCategories)



export default adminSubCategoryRouter