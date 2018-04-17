/**
 * Created by Joseph on 18/09/2017.
 * test get/post/put/delete 
 */
const Models = require('../../models')
const { CODE, CODE_MSG } = require('../../config')
const similarity = require('../../common/nlp').computeSimilarity

class NlpService {

  async beforeVerbCheckLogin(ctx, next) {
    return !ctx.currentAccount ? { message: CODE_MSG[10000], code: CODE.NEED_LOGIN } : null
  }

  async computeTextSimilarity(ctx, next) {
    const [targets, compire] = [ctx.request.body.targets || [], ctx.request.body.compire]
    return { data: targets.map(item => { return similarity(compire, item) }) }
  }

}

module.exports = new NlpService()
