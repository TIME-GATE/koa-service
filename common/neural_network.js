const brain = require('brain')
const fs = require('fs');
const Tokenizer = require('nodejieba')
const path = require('path')

const trainModel = new brain.NeuralNetwork()
const testDataDir = path.join(__dirname, '../data/test.csv')

console.log(testDataDir)

const hash = {
  '苹果': 110,
  '三星': 111,
  '华为': 112,
  '小米': 113,
  '魅族': 114,
  '诺基': 115
}

const text = fs.readFileSync(testDataDir, 'utf-8').split('\n').slice(0, 100)
const WORD_DATA = []

text.forEach(tx => {
  Tokenizer.extract(tx.split('\t')[0], 20000).forEach(item => {
    console.log(tx.split('\t'))
    WORD_DATA.push({
      input: { word: hash[item.word], weight: item.weight },
      output: { lable: parseInt(tx.split('\t')[1]) }
    })
  })
})

trainModel.train(WORD_DATA, { log: false })
console.log(WORD_DATA)
class NeuralNetwork {

  async testBrain(ctx, next) {
    let lable = 0
    const content = Tokenizer.extract(ctx.query.content, 20000)
    content.forEach(item => {
      const [ word, weight ] = [ hash[item.word], item.weight ]
      console.log(word, weight)
      console.log(trainModel.run({ word: hash[word], weight }).lable)
      lable += trainModel.run({ word: hash[word], weight }).lable
    })
    return { lable:  lable/content.length } 
  }

}

module.exports = new NeuralNetwork()