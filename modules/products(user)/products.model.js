import { model, Schema, Types } from "mongoose";
import slugify from "slugify";


const productSchema = new Schema({
    productName: {
    type: String,
    unique: [true, "name is required"],
    trim: true,
    required: true,
    minLength: [2, "too short product name"],
},
slug:{
    type: String,
    unique: [true, "name is required"],
},
    images: [{
        secure_url: { type: String, required: true },
        public_id: { type: String, required: true }
    }],
    coverImage: {
        secure_url: { type: String, required: true },
        public_id: { type: String, required: true }
    },
createdBy:{
    type:Types.ObjectId,
    ref:"User"
},
discription:String,
price:Number,
priceAfterDiscount:Number,
brandIdRef:{
    type:Types.ObjectId,
    ref:"Brand"
},
categoryIdRef:{
    type:Types.ObjectId,
    ref:"Category"
},
subCategoryIdRef:{
    type:Types.ObjectId,
    ref:"SubCategory"
},
rateCount:Number,
rateAvg:Number,
stoke:Number,
sold:Number


},{toJSON: { virtuals: true }})

productSchema.virtual('myReviews', {
    ref: 'Reviews',
    localField: '_id',
    foreignField: 'productIdRef'
  });

  productSchema.pre('findOne', function(){
    this.populate('myReviews')
})

productSchema.pre('save', function (next) {
    if (this.productName) {
        console.log("Generating slug from:", this.productName);
        this.slug = slugify(this.productName); // Generate slug  
    }
    next();
});


export const Product = model('Product',productSchema)