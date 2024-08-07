import joi from "joi"


const addCategoriesVal = joi.object({
    name:joi.string().min(3).max(50).required(),
    image:joi.object({
        fieldname:joi.string().required(),
        originalname:joi.string().required(),
        encoding:joi.string().required(),
        mimetype:joi.string().valid('image/png','image/jpg','image/jpeg','image/gif').required(),
        size:joi.string().required(),
        destination:joi.string().required(),
        filename:joi.string().required(),
        path:joi.string().required(),
    }).required(),
})

export{
    addCategoriesVal
}