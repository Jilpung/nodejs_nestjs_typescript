function getWelcomeTemplate(myname, myage, myschool, mycreatedAt) {
  const result = `
    <html>
      <body>
        <h1>철수님 가입을 환영합니다!!</h1>
        <hr />
        <div>이름: ${myname}</div>
        <div>나이: ${myage}</div>
        <div>학교: ${myschool}</div>
        <div>가입일: ${mycreatedAt}</div>
      </body>
    </html>
  `
  console.log(result)
}

const myname = "영희";
const myage = 12;
const myschool = "다람쥐초등학교";
const mycreatedAt = "2020-01-02";

getWelcomeTemplate(myname, myage, myschool, mycreatedAt);