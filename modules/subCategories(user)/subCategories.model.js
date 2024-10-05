import { model, Schema, Types } from "mongoose";


const subCategorySchema = new Schema({
subCategoryName: {
    type: String,
    unique: [true, "name is required"],
    trim: true,
    required: true,
    minLength: [2, "too short category name"],
},
slug:{
    type: String,
    lowerCase:true,
    unique: [true, "name is required"],
},
    image: {
        secure_url: { type: String, required: true },
        public_id: { type: String, required: true }
    },
categoryIdRef:{
    type:Types.ObjectId,
    ref:"Category"
}

});

subCategorySchema.pre('save', function (next) {
    if (this.brandsubCategoryName) {
        console.log("Generating slug from:", this.brandsubCategoryName);
        this.slug = slugify(this.brandsubCategoryName); // Generate slug  
    }
    next();
});

export const SubCategory = model('SubCategory',subCategorySchema)