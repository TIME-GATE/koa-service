const Protocol = require('../protocol')
const config = require('../../config')
const Helpers = require('../../common/helper')

module.exports = async function (ctx, next) {
  const vRoute = `${ctx.method} ${ctx.path}`
  
  if (!config[vRoute]) {
    return await next()
  }

  const notValidate = Protocol.accept(ctx, config[vRoute])

  return notValidate ? Helpers.response(ctx, notValidate) : await next()
}