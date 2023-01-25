console.log("안녕하세요~")

function getToken(num) {
  if(num === undefined){
    console.log("에러! 갯수를 입력!")
    return
  } else if(num <= 0) {
    console.log("에러! 갯수가 너무 적음!")
    return
  } else if(num > 10) {
    console.log("에러! 갯수가 너무 많음!")
  }

  const result = String(Math.floor(Math.random() * 10 ** num)).padStart(num, "0")
  console.log(result)
}

getToken(5);