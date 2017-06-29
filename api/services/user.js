const Models = require('../../models')
const { readCache, writeCache } = require('../../common/redis')
const { Code, CodeMsg } = require('../../config')

class UserService {


  async beforeFetchOptionalStock(ctx, next) {
    if(!ctx.currentAccount) return { message: CodeMsg[34007], code: Code.NEED_LOGIN }
  }

  async fetchOptionalStock(ctx, next) {
    const optionalList = await readCache(`OptionalList:${ctx.currentAccount}`)
    return { data: JSON.parse(optionalList) }
  } 

  async beforeSyncOptionalStock(ctx, next) {
    if(!ctx.currentAccount) return { message: CodeMsg[34007], code: Code.NEED_LOGIN }
  }

  async syncOptionalStock(ctx, next) {
    return await writeCache(`OptionalList:${ctx.currentAccount}`, ctx.request.body.optionalList)
  }  

}

module.exports = new UserService()
