const Models = require('../../models')
const { readCache, writeCache } = require('../../common/redis')
const { Code, CodeMsg } = require('../../config')

class VerbService {

  async beforeVerbCheckLogin(ctx, next) {
    if(!ctx.currentAccount) return { message: CodeMsg[10000], code: Code.NEED_LOGIN }
  }

  async verbGetOnThisTest(ctx, next) {
    return { data: { data: 'GET' } }
  } 

  async verbPostOnThisTest(ctx, next) {
    return { data: 'POST' }  
  }

  async verbPutOnThisTest(ctx, next) {
    return { data: 'PUT' }
  }

  async verbDeleteOnThisTest(ctx, next) {
    return { data: 'DELETE' }
  }

}

module.exports = new VerbService()
