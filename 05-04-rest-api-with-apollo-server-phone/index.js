import { ApolloServer, gql } from 'apollo-server';
import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js'

// The GraphQL schema
const typeDefs = gql`
  #프론트에서 받아오는 타입은 input
  input createBoardInput {
    writer: String
    title: String
    content: String
  }

  #프론트로 보내는 타입은 type
  type BoardReturn {
    number: Int
    writer: String
    title: String
    content: String
  }

  type Query {
    # fetchBoards: [BoardReturn]
    fetchBoards: [BoardReturn] # => 배열 안에 객체 1개 이상을 의미
  }

  type Mutation {
    createBoard(writer:String, title:String, content:String): String
    createBoard2(createBoardInput: createBoardInput!): String
    createTokenOfPhone(myphone: String): String 

  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    fetchBoards: () => {
      //1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
      const result = [
        {number: 1, writer: "철수", title:"~타이틀", content: "~내용"},
        {number: 2, writer: "영희", title:"~타이틀", content: "~내용"},
        {number: 3, writer: "맹구", title:"~타이틀", content: "~내용"}
      ]
      //2. 꺼내온 결과 응답주기

      return result;
    }
  },

  Mutation: {
    createBoard: (_, args) => {
      //1. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기
      console.log(args)
      //2. 저장 결과 응답주기


      return "등록에 성공하셨습니다."
    },

    createBoard2: (_, args) => {
      //1. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기
      console.log(args)
      //2. 저장 결과 응답주기


      return "등록에 성공하셨습니다."
    },

    createTokenOfPhone: (_, args) => {
      // 1. 핸드폰번호 자릿수 맞는지 확인하기
      const isValid = checkValidationPhone(args.myphone);
      
      if(isValid === true){
        // 2. 핸드폰 토큰 6자리 만들기
        const myToken = getToken();
    
        // 3. 핸드폰번호에 토큰 전송하기
        sendTokenToSMS(args.myphone, myToken);
        return "인증완료!!"
      } 
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(3001).then(({ url }) => {
  console.log(`🚀 Server ready at ${url} on port ${3001}`);
});