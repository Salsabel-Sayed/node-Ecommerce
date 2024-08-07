export const validate = (userSchema)=>{
    return (req,res,next)=>{
        let {error} =userSchema.validate({image:req.body, ...req.params,...req.query,...req.file} ,{abortEarly: false})
        if(error){
            next()
        }else{
           let errMsg = error.details.map(err =>{err.message})
           res.json(errMsg)
        }
    }
}

