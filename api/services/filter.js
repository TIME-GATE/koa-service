/**
 * Created by Joseph on 18/09/2017.
 * test get/post/put/delete 
 */
const { CODE, CODE_MSG } = require('../../config')

class FilterService {

  async beforeVerbCheckLogin(ctx, next) {
    console.log('adsfadf')
    return !ctx.currentAccount ? { message: CODE_MSG[10000], code: CODE.NEED_LOGIN } : null
  }

  async testFilter(ctx, next) {
    return { data: 'testFilter' }
  }

}

module.exports = new FilterService()
