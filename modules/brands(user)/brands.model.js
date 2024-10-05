import { model, Schema, Types } from "mongoose";
import slugify from "slugify"


const brandSchema = new Schema({
brandName: {
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


brandSchema.pre('save', function (next) {
    if (this.brandName) {
        console.log("Generating slug from:", this.brandName);
        this.slug = slugify(this.brandName); // Generate slug  
    }
    next();
});
export const Brand = model('Brand',brandSchema)