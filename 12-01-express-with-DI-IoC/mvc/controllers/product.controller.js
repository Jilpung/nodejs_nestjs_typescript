export class ProductController {
  constructor(cashService, productService) {
    this.cashService = cashService
    this.productService = productService
  }
  buyProduct = (req, res) => {
    // 1. 가진돈 검증
    // const cashService = new CashService()
    const hasMoney = this.cashService.checkValue() // true 또는 false
  
    // 2. 판매여부 검증
    // const productService = new ProductService()
    const isSoldout = this.productService.checkSoldout() // true 또는 false
  
    // 3. 상품 구매
    if(hasMoney  && !isSoldout){
      res.send("상품구매완료")
    }
  }

  refundProduct = (req, res) => {
    // 1. 판매여부 검증
    // const productService = new ProductService()
    const isSoldout = this.productService.checkSoldout() // true 또는 false
  
    // 2. 상품 환불
    if(isSoldout){
      res.send("상품 환불 완료")
    }
}
}