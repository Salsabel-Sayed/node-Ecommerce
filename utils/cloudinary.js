import { config } from "dotenv"
import path from "path"
config({ path: path.resolve("config/.env") })

import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
    cloud_name: "dulbtdvey",
    api_key: "636562159571532",
    api_secret: "UfmNDFPSTysSJWd74M-9MiIdjq4",
    secure: true
})
export default cloudinary
