import { CashService } from "./services/cash.service"
import { ProductService } from "./services/product.service"


export class ProductController {
  buyProduct = (req, res) => {
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
  }

  refundProduct = (req, res) => {
    // 1. 판매여부 검증
    const productService = new ProductService()
    const isSoldout = productService.checkSoldout() // true 또는 false
  
    // 2. 상품 환불
    if(isSoldout){
      res.send("상품 환불 완료")
    }
}
}