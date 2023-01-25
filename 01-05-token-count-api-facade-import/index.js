import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js'

function createTokenOfPhone(myphone, count) {
  // 1. 핸드폰번호 자릿수 맞는지 확인하기
  const isValid = checkValidationPhone(myphone);
  
  if(isValid === true){
    // 2. 핸드폰 토큰 6자리 만들기
    const myToken = getToken(count);

    // 3. 핸드폰번호에 토큰 전송하기
    sendTokenToSMS(myphone, myToken);
  } 
}

// API 실행하기
createTokenOfPhone('01012345678', 6);