import coolsms from "coolsms-node-sdk";
import 'dotenv/config';

export function checkValidationPhone(myphone) {
  // 1. 휴대폰번호 자릿수 맞는지 확인하기
  if (myphone.length !== 10 && myphone.length !== 11) {
    console.log('에러 발생!!! 핸드폰 번호를 제대로 입력해 주세요!!!');
    return false;
  } else {
    return true;
  }
}
export function getToken() {
  const count = 6
  if (count === undefined) {
    console.log('에러 발생!!! 갯수를 제대로 입력해 주세요!!!');
    return;
  } else if (count <= 0) {
    console.log('에러 발생!!! 갯수가 너무 적습니다!!!');
    return;
  } else if (count > 10) {
    console.log('에러 발생!!! 갯수가 너무 많습니다!!!');
    return;
  }

  const result = String(Math.floor(Math.random() * 10 ** count)).padStart(
    count,
    '0'
  );
	return result;
  // console.log(result);
}

export async function sendTokenToSMS(myphone, token) {
  const SMS_KEY = process.env.SMS_KEY
  const SMS_SECRET = process.env.SMS_SECRET
  const SMS_SENDER = process.env.SMS_SENDER

  const mysms = coolsms.default
  const messageService = new mysms(SMS_KEY, SMS_SECRET)
  const result = await messageService.sendOne({
    to: myphone,
    from: SMS_SENDER,
    text: `hello, 인증번호는 [${token}]입니다. 확인 해주세요.`
  })
  console.log(result)
  // console.log(myphone + '번호로 인증번호' + token + '를 전송합니다!!!');


}
