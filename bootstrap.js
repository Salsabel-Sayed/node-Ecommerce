import adminSubCategoryRouter from "./modules(admin)/adminSubCategories/adminSubCategory.routes.js"
import subCategoryRouter from "./modules/subCategories(user)/subCategories.routes.js"
import adminBrandRouter from "./modules(admin)/adminBrands/adminBrands.routes.js";
import brandRouter from "./modules/brands(user)/brands.routes.js";
import adminCategoryRouter from "./modules(admin)/adminCategories/adminCategory.routes.js";
import adminProductRouter from "./modules(admin)/products/adminProducts.routes.js";
import adressRouter from "./modules(admin)/adresses/adress.routes.js";
import authRouter from "./middleWare/auth/auth.routes.js";
import cartRouter from "./modules(admin)/cart/cart.routes.js";
import couponRouter from "./modules(admin)/coupons/coupons.routes.js";
import orderRouter from "./modules(admin)/order/order.routes.js";
import reviewRouter from "./modules(admin)/reviews/reviews.routes.js";
import wishlistRouter from "./modules(admin)/wishList/wishlist.routes.js";
import userRouter from "./modules(admin)/users(admin)/users.routes.js";
import categoryRouter from "./modules/categories(user)/categories.routes.js";







export const bootstrap = (app)=>{
    // user
    app.use('/api/admin/users/', userRouter)
    app.use('/api/auth/', authRouter)

    // category
    app.use('/api/admin/category/', adminCategoryRouter)
    app.use('/api/category/', categoryRouter)

    // sub category
    app.use('/api/categories/', subCategoryRouter)
    app.use('/api/subCategories/', subCategoryRouter)
    app.use('/api/admin/subCategory', adminSubCategoryRouter)

    app.use('/api/brand/', brandRouter)
    app.use('/api/admin/brand/', adminBrandRouter)
    app.use('/api/admin/products/', adminProductRouter)
    app.use('/api/adress/', adressRouter)
    app.use('/api/admin/coupon/', couponRouter)
    app.use('/api/cart/', cartRouter)
    app.use('/api/orders/', orderRouter)
    app.use('/api/admin/reviews/', reviewRouter)
    app.use('/api/wishlist/', wishlistRouter)
 
   
  
  
   


}