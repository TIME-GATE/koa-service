const Api = require('koa-hooks').Api
const UserService = require('../../services/user.js')

class UserApi extends Api {
  constructor(ctx, next, cb){
    super(ctx, next, cb)
    this.addHooks([
      'fetchOptionalStock.beforeFetchOptionalStock',
      'syncOptionalStock.beforeSyncOptionalStock',
    ])
  }
  
  async userInfo(ctx, next, cb) {
    const data = await UserService.userInfo(ctx, next)
    data ? cb(ctx, data) : await next()
  }

  async beforeSyncOptionalStock(ctx, next, cb) {
    const data = await UserService.beforeSyncOptionalStock(ctx, next)
    data ? cb(ctx, data) : await next()
  }

  async syncOptionalStock(ctx, next, cb) {
    const data = await UserService.syncOptionalStock(ctx, next)
    data ? cb(ctx, data) : await next()
  }

  async beforeFetchOptionalStock(ctx, next, cb) {
    const data = await UserService.beforeFetchOptionalStock(ctx, next)
    data ? cb(ctx, data) : await next()
  }

  async fetchOptionalStock(ctx, next, cb) {
    const data = await UserService.fetchOptionalStock(ctx, next)
    data ? cb(ctx, data) : await next()
  }

}

module.exports = (ctx, next, cb) => new UserApi(ctx, next, cb)

