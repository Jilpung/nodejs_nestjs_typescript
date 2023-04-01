import axios from "axios"
import cheerio from "cheerio"

async function createBoardAPI(mydata) {

  //1. 입력된 컨텐츠에서 http로 시작하는 글자 있는지 찾기
  const myurl = mydata.contents.split(" ").filter(el => el.includes("https"))[0]

  //2. 만약 있다면, 찾은 주소로 axios.get 요청해서 html 코드로 받아오기 => 스크래핑
  const result = await axios.get(myurl)

  //3. 스크래핑 결과에서 OG(오픈그래프) 코드 골라내서 변수에 저장하기
  const $ = cheerio.load(result.data)
  $("meta").each((_, el) => {
    if($(el).attr("property")){
      const key = $(el).attr("property").split(":")[1]
      const value = $(el).attr("content")
      console.log(key, value)
    }
  })
}

const frontendData = {
  title: "title~~~~",
  contents: "c o n t e s n t s~~~~ https://daum.net 이에요~"
}
createBoardAPI(frontendData)