const log = require('../../common/log')()
const JobQueue = require('../../common/job_queue')
const job = require('./job_queue')

class GuaranteeService {

  async testGuarantee(ctx, next) {
    job('testGuarantee', ctx.request.body, this.processJob)
    return { message: '接收成功' }
  }

  async processJob(ctx, next) {
    
    if(!ctx) {
      next(new Error('Invalid params'))
      return { code: -1, message: '任务失败' }
    }
    
    next()
    return { code: 0, message: '任务成功' }
  }
}

module.exports = new GuaranteeService()