import authRouter from "../middleWare/auth/auth.routes.js"
import adressRouter from "./adresses/adress.routes.js"
import brandRouter from "./brands/brands.routes.js"
import cartRouter from "./cart/cart.routes.js"
import categoryRouter from "./categories/categories.routes.js"
import couponRouter from "./coupons/coupons.routes.js"
import orderRouter from "./order/order.routes.js"
import productRouter from "./products/products.routes.js"
import reviewRouter from "./reviews/reviews.routes.js"
import subCategoryRouter from "./subCategories/subCategories.routes.js"
import userRouter from "./users/users.routes.js"
import wishlistRouter from "./wishList/wishlist.routes.js"



export const bootstrap = (app)=>{
    app.use('/api/categories/', categoryRouter)
    app.use('/api/subCategories/', subCategoryRouter)
    app.use('/api/brand/', brandRouter)
    app.use('/api/coupon/', brandRouter)
    app.use('/api/products/', productRouter)
    app.use('/api/users/', userRouter)
    app.use('/api/auth/', authRouter)
    app.use('/api/reviews/', reviewRouter)
    app.use('/api/wishlist/', wishlistRouter)
    app.use('/api/adress/', adressRouter)
    app.use('/api/coupon/', couponRouter)
    app.use('/api/cart/', cartRouter)
    app.use('/api/orders/', orderRouter)


}