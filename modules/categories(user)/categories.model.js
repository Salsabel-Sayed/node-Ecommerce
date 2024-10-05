import { model, Schema, Types } from "mongoose";
import slugify from "slugify";


const categorySchema = new Schema({
categoryName: {
    type: String,
    unique: [true, "name is required"],
    trim: true,
    required: true,
    minLength: [2, "too short category name"],
},
slug:{
    type: String,
    unique: [true, "name is required"],
},
    image: {
        secure_url: { type: String, required: true },
        public_id: { type: String, required: true }
    },
createdBy:{
    type:Types.ObjectId,
    ref:"User"
}
});

categorySchema.pre('save', function (next) {
    if (this.categoryName) {
        // console.log("Generating slug from:", this.categoryName);
        this.slug = slugify(this.categoryName);
    }
    next();
});

export const Category = model('Category',categorySchema)