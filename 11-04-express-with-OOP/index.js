import express from 'express';
import { CashService } from './cash.js'
import { ProductService } from './product.js';

const app = express();

// 상품 구매하기
app.post("/products/buy", (req, res) => {
  // 1. 가진돈 검증
  const cashService = new CashService()
  const hasMoney = cashService.checkValue() // true 또는 false

  // 2. 판매여부 검증
  const productService = new ProductService()
  const isSoldout = productService.checkSoldout() // true 또는 false

  // 3. 상품 구매
  if(hasMoney  && !isSoldout){
    res.send("상품구매완료")
  }
})

// 상품 환불하기
app.post("/products/refund", (req, res) => {
  // 1. 판매여부 검증
  const productService = new ProductService()
  const isSoldout = productService.checkSoldout() // true 또는 false

  // 2. 상품 환불
  if(isSoldout){
    res.send("상품 환불 완료")
  }
})

// 쿠폰 구매하기
app.post("/coupons/buy", (req, res) => {
  // 1. 가진돈 검증
  const cashService = new CashService()
  const hasMoney = cashService.checkValue() // true 또는 false})

  // 2. 쿠폰 구매
  if(hasMoney){
    res.send("쿠폰구매완료")
  }

})





app.listen(3000, console.log(`server port ${3000}`))