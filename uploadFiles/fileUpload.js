import multer from "multer"
import {v4 as uuidv4} from "uuid"
import { appError } from "../middleWare/errorHandling/appError.js"

const fileUpload = (folderName)=>{
    const storage = multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null, `uploads/${folderName}`)
        },
        filename:(req,file,cb)=>{
            cb(null , uuidv4() + "_" + file.originalname)
        }
    })

    function fileFilter(req,file,cb){
        if(file.mimetype.startsWith('image')){
            cb(null,true)
        }else{
            cb(new appError('image only',401), false)
        }
    }
    const upload = multer({storage, fileFilter})
return upload
}

export const uploadSingleFile = (fieldName, folderName) => fileUpload(folderName).single(fieldName)
export const uploadMixOfFiles = (arrayOfFields, folderName) => fileUpload(folderName).fields(arrayOfFields)

