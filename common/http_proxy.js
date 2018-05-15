const request = require('request')
const iconv = require('iconv-lite')
const https = require('https')
const http = require('http')

const config = require('../config')
const { signData } = require('../common/helper')

const httpsAgent = new https.Agent({ keepAlive: true })
const httpAgent = new http.Agent({ keepAlive: true })

/**
 * 统一 resolve 处理 以code处理结果
 */
module.exports.httpProxy = (verb = 'GET', proxyUrl, params, options = {}, timeout = 3000) => {
  return new Promise((resolve, reject) => {
    request({
      method: verb, 
      url: proxyUrl,
      form: params,
      qs: params,
      // encoding: "binary",
      headers: options.headers || {},
      timeout: timeout,
      agent: proxyUrl.substring(0, 5) === 'https' ? httpsAgent : httpAgent
    }, (err, res, body) => {
      
      if (err) {
        return console.log(`koa service request error:`, err) || resolve({ code: -1, message: '请求失败' })
      }

      try {
        resolve({ data: options.decode ? iconv.decode(body, 'GBK') : JSON.parse(body.trim()) })
      } catch(err) {
        return console.log(`koa service data error:`, err) || resolve({ code: -1, message: '解析失败' })
      }
    })
  })
}

module.exports.embeddedProxy = (cb, params) => {
  return new Promise((resolve, reject) => {
    try {
      return cb((data) => { resolve(data) }, params)
    } catch (err) {
      return resolve({ data: "调用失败", code: -1 })
    }
  })
}
