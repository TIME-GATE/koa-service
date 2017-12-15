const Api = require('koa-hooks').Api
const GuaranteeService = require('../../services/guarantee')

class GuaranteeApi extends Api {
  constructor(ctx, next, cb) {
    super(ctx, next, cb)
    this.addHooks([
      
    ])
  }

  async testGuarantee(ctx, next, cb) {
    const data = await GuaranteeService.testGuarantee(ctx, next)
    data ? cb(ctx, data) : await next()
  }
  
}

module.exports = (ctx, next, cb) => new GuaranteeApi(ctx, next, cb)