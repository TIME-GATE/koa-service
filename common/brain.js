/**
 * this clasifacation is by brain
 * 
 * created by Joseph 24/11/2017.
 * 
 * https://github.com/karpathy/convnetjs
 * http://dev.dafan.info/detail/344858?p=54-68
 */
 
const brain = require('brain')
const fs = require('fs');
const Tokenizer = require('nodejieba')
const path = require('path')

const trainModel = new brain.NeuralNetwork()
const testDataDir = path.join(__dirname, '../data/test.csv')

class NeuralNetwork {

  constructor(testDataDir, trainModel) {
    this._sourceDataDir = testDataDir
    this._trainModel = trainModel
    this._WORD_DATA = []
  }

  async trainData() {
    const text = fs.readFileSync(this._sourceDataDir, 'utf-8').split('\n').slice(0, 100)
    
    text.forEach(tx => {
      Tokenizer.extract(tx.split('\t')[0], 20000).forEach(item => {
        console.log(tx.split('\t'))
        this._WORD_DATA.push({
          input: { word: hash[item.word], weight: item.weight },
          output: { lable: parseInt(tx.split('\t')[1]) }
        })
      })
    })
    this._trainModel.train(this._WORD_DATA, { log: false })
  }

  async testBrain(ctx, next) {
    let lable = 0
    const content = Tokenizer.extract(ctx.query.content, 20000)
    content.forEach(item => {
      const [ word, weight ] = [ hash[item.word], item.weight ]
      lable += trainModel.run({ word: hash[word], weight }).lable
    })
    return { lable:  lable/content.length } 
  }

}

module.exports = new NeuralNetwork()