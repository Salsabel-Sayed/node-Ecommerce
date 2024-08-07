import express from 'express';
import {dbConnect} from "./dataBase/dbConnection.js"
import {appError} from "./middleWare/errorHandling/appError.js"
import { globalError } from './middleWare/errorHandling/globalError.js';
import { bootstrap } from './modules/bootstrap.js';
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

// import "dotenv/config"
const app = express()
const port =process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use('/uploads',express.static('uploads'))

bootstrap(app)
app.use('*',(req,res,next)=>{
    next(new appError(`route not found ${req.originalUrl}`, 404))
})

app.use(globalError)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))   