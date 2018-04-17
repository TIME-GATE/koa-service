const Api = require('koa-hooks').Api
const NlpService = require('../../services/nlp')

class NlpApi extends Api {
  constructor(ctx, next, cb) {
    super(ctx, next, cb)
    this.addHooks([

    ])
  }

  async computeTextSimilarity(ctx, next, cb) {
    const data = await NlpService.computeTextSimilarity(ctx, next)
    data ? cb(ctx, data) : await next()
  }

}

module.exports = (ctx, next, cb) => new NlpApi(ctx, next, cb)