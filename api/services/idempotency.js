const Models = require('../../models')
const { CODE, CODE_MSG } = require('../../config')
const Helpers = require('../../common/helper')

class IdempotencyService {

  async beforeEditCheckVersion(ctx, next) {
    const data = await Models.Idempotency.find({ id: ctx.query.id, version: ctx.query.version })
    console.log(data)
    if (data.length) {
      return { data, message: '数据已修改' }
    }

    return null 
  }

  async beforeAddCheckIsExist(ctx, next) {
    const data = await Models.Idempotency.findOne({ id: ctx.query.id })
    
    if(data) {
      return { data, message: '数据已创建' }
    }

    return null
  }

  async testFetchIdempotency(ctx, next) {
    const data = await Models.Idempotency.find(ctx.query)
    return { data, message: '获取成功' }
  }

  async testDelIdempotency(ctx, next) {
    const data = await Models.Idempotency.remove({ id: ctx.query.id })
    return { data, message: '删除成功' }
  }

  async testEditIdempotency(ctx, next) {
    const data = await Models.Idempotency.update({ id: ctx.query.id, version: { '$lte': ctx.query.version } }, ctx.query)
    return { data, message: '修改成功' }
  }

  async testAddIdempotency(ctx, next) {
    const data = await Models.Idempotency.create(ctx.query)
    return { data, message: '创建成功' }
  }

}

module.exports = new IdempotencyService()
