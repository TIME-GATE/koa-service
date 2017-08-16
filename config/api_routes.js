module.exports.routes = [
  { verb: 'GET', path: '/fetch/user/optional',fn: 'user.fetchOptionalStock',desc: '获取用户列表' },
  { verb: 'POST',path: '/sync/user/optional', fn: 'user.syncOptionalStock', desc: '同步用户列表' },
]
