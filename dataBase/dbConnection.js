import { connect } from "mongoose";



export const dbConnect = connect('mongodb://localhost:27017/e-commerce')
.then(() => console.log('DB connected'))

//mongodb+srv://nodec42:O8h9ijGyYrCNFOmq@atlascluster.ukscwpx.mongodb.net/e-commerce