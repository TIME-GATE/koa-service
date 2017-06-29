/**
 * schema 定义表集合
 * model 定义类方法、实例方法(DAO)、表关系
 */
const sequelize = require('../common/sequelize')

const AccountSchema = require('./schemas/account')
const Models = require('../models')

const { writeCache } = require('../common/redis')
const { getUserInfo, authLogin } = require('../common/helper')
const { Code, CodeMsg } = require('../config')
const { wechatHttpProxy } = require('../common/http_proxy')
const { wechatProxy } = require('../config').httpProxy

const Account = sequelize.define('Account', AccountSchema, {
  tableName: 'stock_users',
  instanceMethods: {},
  classMethods: {}
})

module.exports = Account
