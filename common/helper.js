const soap = require('soap')
const crypto = require('crypto')

const API_ROUTE = '../api/controllers/v1/'
const config = require('../config')
const Authcode = require('./authcode')
const { writeCache } = require('./redis')
const { Code, CodeMsg } = require('../config')

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

Helpers.mergeParams = (ctx) => {
  return Object.assign({}, ctx.query, ctx.request.body)
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
    code: data.code ? data.code : 0,
    message: data.message ? data.message : '请求成功',
    data: data.data || {} 
  }
} 
 
Helpers.getUserInfo = (userData) => {
  return {
    nickname: userData.nickname || userData.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
    avatar: userData.avatar || null,
    unionId: userData.unionId || null,
    status: userData.status || 0,
    gender: userData.gender || 'unkown',
    grade: userData.grade || 'default'
  }

}

Helpers.authLogin = async (userInfo, phone, clientType = 'web', expireIn = 30 * 24 * 3600) => {          
 	const authorization = Authcode.encode(`${phone}:${clientType}:${new Date().getTime()}`, clientType)
  const writeStatus = await writeCache(`${phone}:${clientType}`, authorization, expireIn)

  if('OK' === writeStatus) {
  	return { data: { authorization, user: userInfo } } 
  }   
  return { data: { message: "登录失败", code: 123123 }, code: 1 }   
}

Helpers.signData = (secret, data) => {
  let sha = crypto.createHash('sha1')

	let sourceStr = Object.keys(data).sort((a, b) => {
		return a - b
	}).reduce((chain, key) => {
		return `${chain},${key}:${data[key]}`
	}, `secret:${secret}`)

	sha.update(sourceStr)
	return sha.digest('hex')

}

Helpers.byMessageCodeReponse = (resendMessage) => {
  if('SUCCESS' !== resendMessage.data.state) {
    if(resendMessage.data.state) return { message: CodeMsg[Code[resendMessage.data.code]], code: Code[resendMessage.data.code] }
    return { message: CodeMsg[34014], code: Code.PARAMS_ERROR }
  }
  return { data: resendMessage.data.data }
}
