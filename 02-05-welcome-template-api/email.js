import { getToday } from "./utils.js"

export function checkValidationEmail(email) {
  if(email === undefined || !email.includes("@")){
    console.log("에러발생! 이메일 제대로 입력!")
    return false
  } else {
    return true
  }
}

export function getWelcomeTemplate({name, age, school}) {
  return  `
    <html>
      <body>
        <h1>철수님 가입을 환영합니다!!</h1>
        <hr />
        <div>이름: ${name}</div>
        <div>나이: ${age}</div>
        <div>학교: ${school}</div>
        <div>가입일: ${getToday()}</div>
      </body>
    </html>
`
}

export function sendTemplateToEmail(email, template) {
  console.log(email + "이메일로" + template + "를 전송합니다.")
}