import adminSubCategoryRouter from "../modules(admin)/adminSubCategories/adminSubCategory.routes.js"
import subCategoryRouter from "./subCategories(user)/subCategories.routes.js"
import adminBrandRouter from "../modules(admin)/adminBrands/adminBrands.routes.js";
import brandRouter from "./brands(user)/brands.routes.js";
import adminProductRouter from "./products/products.routes.js";
import adminCategoryRouter from "../modules(admin)/adminCategories/adminCategory.routes.js";






export const bootstrap = (app)=>{
    app.use('/api/categories/', subCategoryRouter)
    app.use('/api/admin/category/', adminCategoryRouter)
    app.use('/api/subCategories/', subCategoryRouter)
    app.use('/api/admin/subCategory', adminSubCategoryRouter)

    app.use('/api/brand/', brandRouter)
    app.use('/api/admin/brand/', adminBrandRouter)
    app.use('/api/admin/products/', adminProductRouter)

    // app.use('/api/coupon/', brandRouter)
    // app.use('/api/users/', userRouter)
    // app.use('/api/auth/', authRouter)
    // app.use('/api/reviews/', reviewRouter)
    // app.use('/api/wishlist/', wishlistRouter)
    // app.use('/api/adress/', adressRouter)
    // app.use('/api/coupon/', couponRouter)
    // app.use('/api/cart/', cartRouter)
    // app.use('/api/orders/', orderRouter)


}