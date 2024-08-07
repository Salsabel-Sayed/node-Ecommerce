import { model, Schema, Types } from "mongoose";


const brandSchema = new Schema({
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
brandSchema.post('init', function(doc){
    doc.image = process.env.BASE_URL + 'brands/' + doc.image
})

export const Brand = model('Brand',brandSchema)