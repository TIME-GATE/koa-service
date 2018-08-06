/*
  æ–°ç‰ˆhooks
*/
const Api = require('koa-hooks').Api
const ImageService = require('../../services/image')

class ImageApi extends Api {
  constructor(ctx, next, cb) {
    super(ctx, next, cb)
    this.addHooks([

    ])
  }

  async productImage(ctx, next, cb) {
    const data = await ImageService.productImage(ctx, next)
    data ? cb(ctx, data) : await next()
  }

}

module.exports = (ctx, next, cb) => new ImageApi(ctx, next, cb)