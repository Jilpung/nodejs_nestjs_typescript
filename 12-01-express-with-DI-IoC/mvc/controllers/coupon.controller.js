export class CouponController {
  constructor(pointService) {
    this.pointService = pointService
  }

  buyCoupon = (req, res) => {
    // 1. 가진돈 검증
    // const cashService = new CashService()
    const hasMoney = this.pointService.checkValue() // true 또는 false})
  
    // 2. 쿠폰 구매
    if(hasMoney){
      res.send("쿠폰구매완료")
    }
  
  }
}