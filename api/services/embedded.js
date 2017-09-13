const Models = require('../../models')
const Demo = require('../../build/Release/demo')
const ParamsNocb = require('../../build/Release/test_post_params_nocb')

class EmbeddedService {

  async verbGetOnThisEmbedded(ctx, next) {
    return { data: await Promise.resolve(Demo.hello('hello')) }
  }

  async testPostParamsNocb(ctx, next) {
    return { data: await Promise.resolve(ParamsNocb.add(12, 21)) }
  }

}

module.exports = new EmbeddedService()