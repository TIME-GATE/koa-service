const Models = require('../../models')
const { embeddedProxy } = require('../../common/http_proxy')
const Demo = require('../../build/Release/demo')
const ParamsNocb = require('../../build/Release/test_params_nocb')
const FunctionNocb = require('../../build/Release/test_function_nocb')
const ParamsFunctionNocb = require('../../build/Release/test_params_function_nocb')


class EmbeddedService {

  async verbGetOnThisEmbedded(ctx, next) {
    return { data: await Promise.resolve(Demo.hello('hello')) }
  }

  async testParamsNocb(ctx, next) {
    return { data: await Promise.resolve(ParamsNocb.add(12, 21)) }
  }

  async testFunctionNocb(ctx, next) {
    return { data: await embeddedProxy(FunctionNocb) }
  }

  async testPramasFunctionNocb(ctx, next) {
    return { data: await embeddedProxy(ParamsFunctionNocb, 'hello world meng qi') }
  }

}

module.exports = new EmbeddedService()