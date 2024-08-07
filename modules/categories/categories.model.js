import { model, Schema, Types } from "mongoose";


const categorySchema = new Schema({
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
createdBy:{
    type:Types.ObjectId,
    ref:"User"
}
});

categorySchema.post('init', function(doc){
    doc.image = process.env.BASE_URL + 'categories/' + doc.image
})

export const Category = model('Category',categorySchema)