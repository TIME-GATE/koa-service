const brain = require('brain')
const config = require('../config')

const trainModel = new brain.NeuralNetwork()

trainModel.train(config.IMAGE_DATA, { log: true })

class NeuralNetwork {

  async testBrain(ctx, next) {
    return await trainModel.run({ r: 1, g: 0.4, b: 0 })
  }

}

module.exports = new NeuralNetwork()