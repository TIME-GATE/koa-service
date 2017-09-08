const Models = require('../../models')

const { Code, CodeMsg } = require('../../config')
const demo = require('../../build/Release/demo')

class EmbeddedService {

  async verbGetOnThisEmbedded(ctx, next) {
    return { data: await Promise.resolve(demo.hello('hello')) }
  }
}

module.exports = new EmbeddedService()