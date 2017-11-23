const brain = require('brain')
const fs = require('fs');
const Tokenizer = require('nodejieba')

const authcode = require('../common/authcode')
const trainModel = new brain.NeuralNetwork()

const text = fs.readFileSync('/Users/dreamboad/Projects/koa-service/data/labeled-data.csv', 'utf-8').split('\n').slice(0, 100)
const WORD_DATA = []

text.forEach(tx => {
  console.log(tx.split('\t'))
  Tokenizer.extract(tx.split('\t')[0], 20000).forEach(item => {
    WORD_DATA.push({
      input: { word: parseInt(authcode.encode(item.word), 16), weight: item.weight },
      output: { lable: tx.split('\t')[1] }
    })
  })
})

trainModel.train(WORD_DATA, { log: true })

class NeuralNetwork {

  async testBrain(ctx, next) {
    let lable = 0
    const content = Tokenizer.extract(ctx.query.content, 20000)
    console.log(trainModel)
    content.forEach(item => {
      const [ word, weight ] = [ parseInt(item.word), item.weight ]
      lable += trainModel.run({ word, weight }).lable
    })
    return { lable:  lable/content.length } 
  }

}

module.exports = new NeuralNetwork()