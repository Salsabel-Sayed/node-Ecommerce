import { model, Schema, Types } from "mongoose";


const subCategorySchema = new Schema({
name: {
    type: String,
    unique: [true, "name is required"],
    trim: true,
    required: true,
    minLength: [2, "too short category name"],
},
slug:{
    type: String,
    lowerCase:true,
    required:true,
    unique: [true, "name is required"],
},
image:String,
categoryIdRef:{
    type:Types.ObjectId,
    ref:"Category"
}

});

export const SubCategory = model('SubCategory',subCategorySchema)