import {checkValidationEmail, getWelcomeTemplate, sendTemplateToEmail} from "./email.js"

function createUser(user) {
  const isValid = checkValidationEmail(user.email)
  if(isValid){
    const template = getWelcomeTemplate(user)

    sendTemplateToEmail(user.email, template)
  }
}

const myuser = {
  name:"철수",
  age: 8,
  school: "다람쥐초등학교",
  email: "a@a.com"
}

createUser(myuser)
