import express from 'express';

const app = express();

// 상품 구매하기
app.post("/products/buy", (req, res) => {
  // 1. 가진돈 검증

  // 2. 판매여부 검증

  // 3. 상품 구매
  // if(돈 있음 && !판매완료){
    // res.send("상품구매완료")
  // }
})



// 상품 환불하기
app.post("/products/refund", (req, res) => {
  // 1. 판매여부 검증

  // 2. 상품 환불
  res.send("상품 환불 완료")
})









app.listen(3000, console.log(`server port ${3000}`))