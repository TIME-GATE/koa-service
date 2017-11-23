const NeuralNetwork = require('../../common/neural_network')

class NeuralNetworkService {

  async testBrain(ctx, next) {
    return { data: await NeuralNetwork.testBrain(ctx, next) }
  }

}

module.exports = new NeuralNetworkService()