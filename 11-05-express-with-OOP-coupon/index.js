import express from 'express';
import { ProductController, ProductController } from './mvc/controllers/product.controller.js';
import { CouponController } from './mvc/controllers/coupon.controller.js';

const app = express();

// 상품 API
const productController = new ProductController()
app.post("/products/buy", productController.buyProduct)
app.post("/products/refund", productController.refundProduct)

// 쿠폰 API
const couponController = new CouponController()
app.post("/coupons/buy", couponController.buyCoupon) // 쿠폰 구매하기









app.listen(3000, console.log(`server port ${3000}`))