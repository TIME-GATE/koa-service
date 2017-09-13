const Api = require('koa-hooks').Api
const EmbeddedService = require('../../services/embedded.js')

class EmbeddedApi extends Api {
  constructor(ctx, next, cb){
    super(ctx, next, cb)
    this.addHooks([
      
    ])
  }

  async verbGetOnThisEmbedded(ctx, next, cb) {
    const data = await EmbeddedService.verbGetOnThisEmbedded(ctx, next)
    data ? cb(ctx, data) : await next()
  }

  async testPostParamsNocb(ctx, next, cb) {
    const data = await EmbeddedService.testPostParamsNocb(ctx, next)
    data ? cb(ctx, data) : await next()
  }

  async testPostFunctionNocb(ctx, next, cb) {
    const data = await EmbeddedService.testPostFunctionNocb(ctx, next)
    data ? cb(ctx, data) : await next()
  }

}

module.exports = (ctx, next, cb) => new EmbeddedApi(ctx, next, cb)

