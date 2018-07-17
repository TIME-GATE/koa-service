const path = require('path')
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

/**
 * 加载mongodb、mysql
 */
// const mongoose = require('../common/mongoose')
// const sequelize = require('../common/sequelize')

const config = require('../config')

const connection = mongoose.connect(config.database.mongodb.db, (err) => {
  if (err) {
    console.log('connect to error: ', config.database.mongodb.db, err.message)
    process.exit(1)
  }
})

autoIncrement.initialize(connection)

if (!config.env.isProduction()) {
  mongoose.set('debug', true)
}

// 同步mysql数据库
// sequelize.sync()

const modelArr = [
  //'Account',
  'Idempotency',
]

modelArr.map((modelName) => {
  exports[modelName] = require(path.join(__dirname, modelName))
})

