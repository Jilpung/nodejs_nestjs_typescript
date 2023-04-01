import express from 'express'
import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js'
import { checkValidationEmail, getWelcomeTemplate, sendTemplateToEmail }from './email.js'
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { options } from './swagger/config.js'
import cors from 'cors';
import mongoose from 'mongoose';
import { Board } from './models/board.model.js'
import { Stock } from './models/stock.model.js';


const app = express()
app.use(cors())
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));
app.get('/boards', async(req, res) => {
  //1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
  // const result = [
  //   {number: 1, writer: "철수", title:"~타이틀", content: "~내용"},
  //   {number: 2, writer: "영희", title:"~타이틀", content: "~내용"},
  //   {number: 3, writer: "맹구", title:"~타이틀", content: "~내용"}
  // ]
  const result = await Board.find();

  //2. 꺼내온 결과 응답주기
  
  res.send(result)
})

app.post('/boards', async (req, res) => {
  console.log(req.body)
  //1. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기
  const board = new Board({
    writer: req.body.writer,
    title: req.body.title,
    contents: req.body.contents
  })
  await board.save();

  //2. 저장 결과 응답주기
  res.send("게시물 등록 성공")
})

app.post('/tokens/phone', (req, res) => {
  const myphone = req.body.myphone
  console.log(req.body)
  // 1. 핸드폰번호 자릿수 맞는지 확인하기
  const isValid = checkValidationPhone(myphone);

  if(isValid){
    // 2. 핸드폰 토큰 6자리 만들기
    const myToken = getToken();

    // 3. 핸드폰번호에 토큰 전송하기
    sendTokenToSMS(myphone, myToken);
    res.send("인증성공!!")
  } 
})

app.post('/users', (req, res) => {
  const user = req.body.myuser

  const isValid = checkValidationEmail(user.email)
  if(isValid){
    const mytemplate = getWelcomeTemplate(user)

    sendTemplateToEmail(user.email, mytemplate)
    res.send("가입완료!")

  }
})

app.get("/stocks", async (req, res) => {
  const stocks = await Stock.find()
  res.send(stocks)
})

//몽고DB 접속!
mongoose.connect("mongodb://my-database:27017/mydocker03")


//backend api 서버 오픈!
app.listen(4000, () => {
  console.log(`Example app listening on port ${4000}`)
})