module.exports.routes = [
  { verb: 'GET', path: '/user/wechatLogin',   fn: 'user.wechatLogin',  desc: '第三方快速登录' },
  { verb: 'POST',path: '/fetch/user/group',   fn: 'user.userInfo',     desc: '微信端调用获取用户信息'},
  { verb: 'GET', path: '/fetch/user/optional',fn: 'user.fetchOptionalStock',desc: '获取用户自选列表' },
  { verb: 'POST',path: '/sync/user/optional', fn: 'user.syncOptionalStock', desc: '同步用户自选股票' },
]
