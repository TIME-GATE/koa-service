
const moment = require('moment')

const API_ROUTE = '../api/controllers/v1/'
const similarity = require('./nlp').computeSimilarity


const Helpers = {}

module.exports = Helpers

Helpers.toFn = (api, ctx, next, cb) => {
  try {
    let [moduleName, methodName] = api.split('.')
    return { modules: require(`${API_ROUTE}${moduleName}`)(ctx, next, cb), method: methodName }
  } catch(err) { 
    throw err   
  }
}

Helpers.response = (ctx, data = {}) => {
  switch (data.code ? data.code : 0) {
    case 0:
      ctx.response.status = 200
      break
    default:
      ctx.response.status = 400
      break
  }

  ctx.body = {
    code: data.code || 0,
    message: data.message || '请求成功',
    data: data.data || {} 
  }

}

Helpers.sleep = (ttl = 3000, flag = true) => {
  const timeNow = new Date().getTime()
  
  while (flag) {
    if (new Date().getTime() - timeNow >= ttl) flag = false
  }

}

Helpers.textFilter = (compire, targets = [], preRepeat = 0.8) => {
  let curRepeat = 0

  for (let item of targets) {
    curRepeat = similarity(compire, item)
    if (curRepeat >= preRepeat) {
      break
    }
  }

  return curRepeat >= preRepeat ? true : false
}

Helpers.zoneTime = (zone) => {
  return moment().utcOffset(zone)
}
