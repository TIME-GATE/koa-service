const NodeCache = require('node-cache')

const memoryCache = new NodeCache()

module.exports.memoryCache = memoryCache

module.exports.writeMemoryCache = async (key, obj, ttl = 3000) => {
  return new Promise((resolve, reject) => {
    memoryCache.set(key, obj, (err, success) => {
      if (!err && success) {
        return resolve({ code: 0 })
      } else {
        return console.log('set cache in memory err: ', err) && resolve({ code: -1 })
      }
    })
  })
}

module.exports.readMemoryCache = async(key) => {
  return new Promise((resolve, reject) => {
    memoryCache.get(key, (err, value) => {
      if (!err && value) {
        return resolve({ code: 0, data: value })
      } else {
        return console.log('get cache in memory err: ', err) && resolve({ code: -1 })
      }
    })
  })
}