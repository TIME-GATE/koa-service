/**
 * user account 
 */

const Sequelize = require('sequelize')

module.exports = {
  uid: {
    type: Sequelize.INTEGER,
    field: 'id',
    unique: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.STRING,
    field: 'username'
  },
  nickname: {
    type: Sequelize.STRING,
    field: 'nickname'
  },
  avatar: {
    type: Sequelize.STRING,
    field: 'avatar'
  },
  email: {
    type: Sequelize.STRING,
    field: 'email'
  },
  password: {
    type: Sequelize.STRING,
    field: 'password'
  },
  phone: {
    type: Sequelize.STRING(28),
    primaryKey: true,
    field: 'phone'
  },
  address: {
    type: Sequelize.STRING,
    field: 'address'
  },
  unionId: {
    type: Sequelize.STRING,
    field: 'unionid'
  },
  weiboId: {
    type: Sequelize.STRING,
    field: 'weiboid'
  },
  // 用户状态
  status: {
    type: Sequelize.INTEGER,
    field: 'status',
    defaultValue: 0
  },
  realname: {
    type: Sequelize.STRING,
    field: 'realname'
  },
  gender: {
    type: Sequelize.ENUM,
    values: ['unknown', 'male', 'female'],
    field: 'gender',
    defaultValue: 'unknown'
  },
  // 用户等级
  grade: {
    type: Sequelize.STRING,
    field: 'grade',
    defaultValue: 'default'
  },
  // 账户余额
  balance: {
    type: Sequelize.DECIMAL(10, 2),
    field: 'balance'
  },
  // 记录相关
  registeredIp: {
    type: Sequelize.STRING,
    field: 'regip'
  },
  latestVisitIp: {
    type: Sequelize.STRING,
    field: 'lastip'
  },
  loginCount: {
    type: Sequelize.INTEGER,
    field: 'logins'
  },
	//超级用户或系统管理员等
  generated: {
    type: Sequelize.INTEGER,
    field: 'isSystem',
    defaultValue: 0
  },
  // 保留字段  
  default1: {
    type: Sequelize.STRING,
    field: 'default1'
  },
  default2: {
    type: Sequelize.STRING,
    field: 'default2'
  },
  default3: {
    type: Sequelize.STRING,
    field: 'default3'
  } 
}
