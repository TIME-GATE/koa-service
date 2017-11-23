const Api = require('koa-hooks').Api
const NeuralNetworkService = require('../../services/neural_network')

class NeuralNetworkApi extends Api {
  constructor(ctx, next, cb) {
    super(ctx, next, cb)
    this.addHooks([
      
    ])
  }

  async testBrain(ctx, next, cb) {
    const data = await NeuralNetworkService.testBrain(ctx, next)
    data ? cb(ctx, data) : await next()
  }
  
}

module.exports = (ctx, next, cb) => new NeuralNetworkApi(ctx, next, cb)