const Protocol = require('../protocol')
const config = require('../../config')
const Helpers = require('../../common/helper')

module.exports = async function (ctx, next) {
  
  if (!config[ctx.path]) {
    return await next()
  }

  const notValidate = Protocol.accept(ctx, config[ctx.path])

  return notValidate ? Helpers.response(ctx, notValidate) : await next()

}