class Demo {
  constructor() {
    this.name = 'name'
    this.year = 'year'
  }

  getName() {
    console.log(this.name)
  }

  getYear() {
    console.log(this.year)
  }

  getAllP() {
    console.log(this.__proto__)
  }

}

const demo = new Demo()

demo.getAllP()
console.log(Reflect.ownKeys(demo))