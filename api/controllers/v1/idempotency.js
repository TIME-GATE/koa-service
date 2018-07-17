/**
 *  增删改查幂等性设计
 *  1、查删天然幂等
 *  2、修改: 有限转状态机:如版本号
 *  3、新增: 全局唯一id
 */

const Api = require('koa-hooks').Api
const IdempotencyService = require('../../services/idempotency')

class IdempotencyApi extends Api {
  constructor(ctx, next, cb) {
    super(ctx, next, cb)
    this.addHooks([
      'testEditIdempotency.beforeEditCheckVersion',
      'testAddIdempotency.beforeAddCheckIsExist'
    ])
  }

  async beforeEditCheckVersion(ctx, next, cb) {
    const data = await IdempotencyService.beforeEditCheckVersion(ctx, next)
    data ? cb(ctx, data) : await next()
  }

  async beforeAddCheckIsExist(ctx, next, cb) {
    const data = await IdempotencyService.beforeAddCheckIsExist(ctx, next)
    data ? cb(ctx, data) : await next()
  }

  async testFetchIdempotency(ctx, next, cb) {
    const data = await IdempotencyService.testFetchIdempotency(ctx, next)
    data ? cb(ctx, data) : await next()
  }

  async testDelIdempotency(ctx, next, cb) {
    const data = await IdempotencyService.testDelIdempotency(ctx, next)
    data ? cb(ctx, data) : await next()
  }

  async testEditIdempotency(ctx, next, cb) {
    const data = await IdempotencyService.testEditIdempotency(ctx, next)
    data ? cb(ctx, data) : await next()
  }

  async testAddIdempotency(ctx, next, cb) {
    const data = await IdempotencyService.testAddIdempotency(ctx, next)
    data ? cb(ctx, data) : await next()
  }

}

module.exports = (ctx, next, cb) => new IdempotencyApi(ctx, next, cb)