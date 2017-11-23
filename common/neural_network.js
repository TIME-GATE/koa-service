const brain = require('brain')
const fs = require('fs');
const Tokenizer = require('nodejieba')

const authcode = require('../common/authcode')
const trainModel = new brain.NeuralNetwork()

const text = fs.readFileSync('/Users/dreamboad/Projects/koa-service/data/train.txt', 'utf-8')

const WORD_DATA = Tokenizer.extract(text, 20000).map(item => {
  return {
    input: { word: parseInt(authcode.encode(item.word), 16), weight: item.weight },
    output: { lable: Math.round(Math.random()) }
  }
})

trainModel.train(WORD_DATA, { log: true })

class NeuralNetwork {

  async testBrain(ctx, next) {
    let lable = 0
    const content = Tokenizer.extract(ctx.query.content, 20000)
    content.forEach(item => {
      const [ word, weight ] = [ parseInt(item.word), item.weight ]
      lable += trainModel.run({ word, weight }).lable
    })
    return { lable:  lable/content.length } 
  }

}

module.exports = new NeuralNetwork()