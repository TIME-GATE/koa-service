/*
  新版hooks
*/
const FilterService = require('../../services/filter')
const Ctl = require('../../../common/ctl_filter')

class FilterApi extends Ctl {
  constructor(ctx, next, cb) {
    super(ctx, next, cb)
    this.beforeFilter('beforeVerbCheckLogin', this.beforeVerbCheckLogin)
  }

  async beforeVerbCheckLogin(ctx, next, cb) {
    console.log('adfadfadfadf')

    const data = await VerbService.beforeVerbCheckLogin(ctx, next)
    data ? cb(ctx, data) : await next()
  }

  async testFilter(ctx, next, cb) {
    const data = await FilterService.testFilter(ctx, next)
    data ? cb(ctx, data) : await next()
  }

}

module.exports = (ctx, next, cb) => new FilterApi(ctx, next, cb)