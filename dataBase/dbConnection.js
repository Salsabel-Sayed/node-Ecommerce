import { connect } from "mongoose";
import { User } from "../modules/users/users.model.js";
import bcrypt from "bcrypt"
import { catchError } from "../middleWare/errorHandling/catchError.js";
import jwt  from 'jsonwebtoken';



export const dbConnect = connect('mongodb://localhost:27017/e-commerce')
.then(async() => {console.log('DB connected');
    await createOwnerUser()})



const createOwnerUser = async () => {
    const ownerExists = await User.findOne({ role: 'owner' });

    if (!ownerExists) {
        const ownerUser = new User({
            name: 'owner',
            email: 'owner@example.com',
            password: bcrypt.hashSync('ownerPassword', 3), // You can make the password stronger or fetch from env variables
            phone: '1234567890',
            role: 'owner',
            isActive: true,
        });
        try {
            
            
            await ownerUser.save();
            const token = jwt.sign({
                _id: ownerUser.id,
                role: ownerUser.role,
                email: ownerUser.email,
                password: ownerUser.password,
                isActive: ownerUser.isActive
            },"ecommerceforbackandfront")
           console.log('owner created successfully!', token);
        } catch (err) {
            console.error('Error creating owner user:', err);
        }
    } else {
        console.log('owner user already exists');
    }
}

export default createOwnerUser 

//mongodb+srv://nodec42:O8h9ijGyYrCNFOmq@atlascluster.ukscwpx.mongodb.net/e-commerce