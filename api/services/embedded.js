const Models = require('../../models')
const { embeddedProxy } = require('../../common/http_proxy')
const Demo = require('../../build/Release/demo')
const ParamsNocb = require('../../build/Release/test_post_params_nocb')
const PostFunctionNocb = require('../../build/Release/test_post_function_nocb')

class EmbeddedService {

  async verbGetOnThisEmbedded(ctx, next) {
    return { data: await Promise.resolve(Demo.hello('hello')) }
  }

  async testPostParamsNocb(ctx, next) {
    return { data: await Promise.resolve(ParamsNocb.add(12, 21)) }
  }

  async testPostFunctionNocb(ctx, next) {
    return { data: await embeddedProxy(PostFunctionNocb) }
  }

}

module.exports = new EmbeddedService()