import { model, Schema, Types } from "mongoose";


const productSchema = new Schema({
productTitle: {
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
createdBy:{
    type:Types.ObjectId,
    ref:"User"
},
    imageCover: {
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
productSchema.post('init', function(doc){
    if(doc.imageCover)doc.imageCover = process.env.BASE_URL +'products/' + doc.imageCover
    if( doc.images)doc.images = doc.images.map(img => process.env.BASE_URL + 'products/' + img)
})


export const Product = model('Product',productSchema)