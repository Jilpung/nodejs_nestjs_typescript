const aaa = new Date()

aaa.getFullYear()

console.log(aaa.getFullYear())

class Monster {
  power = 10

  constructor(aaa) {
    this.power = aaa
  }

  attack = () => {
    console.log("공격!" + this.power)
  }

  run = () => {
    console.log("도망!")
  }
}

const mymonster1 = new Monster(10)
mymonster1.attack()
mymonster1.run()
const mymonster2 = new Monster(50)
mymonster2.attack()
mymonster2.run()