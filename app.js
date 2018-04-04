const Koa = require('koa')
const router = require('koa-router')()

const compress = require('koa-compress')
const bodyParser = require('koa-bodyparser')

const csrf = require('koa-csrf')
const cors = require('koa-cors')

const Helpers = require('./common/helper')
const sequelize = require('./common/sequelize')
const config = require('./config')
const authorization = require('./api/middlewares/authorization')

// 同步数据库
// sequelize.sync()

// require('./models')
require('./schedules')

const app = new Koa()

// web socket
const server = require('http').Server(app.callback())
const io = require('socket.io')(server)

io.on('connection', client => {
  console.log('new connection:')

  client.on('news', (data, cb) => {
    console.log('news:', data)
  })

  client.on('disconnect', () => {
    console.log('disconnect:')
  })

})


config.routes.map((route) => {
  try {
    router[route.verb.toLowerCase()](route.path, async (ctx, next) => {
      const { modules, method } = Helpers.toFn(route.fn, ctx, next, Helpers.response)
      await modules[method].call(modules, ctx, next, Helpers.response)
    }) 
  } catch(err) {
    ctx.throw(400, err)
  }
})

/**
 * cors: 允许跨域
 * config.logger.access: 开启请求日志
 * bodyParser: 参数解析 
 * compress: 压缩数据包
 * authorization 认证中间件
 * router: 请求路由
 */
app.use(cors())
app.use(config.logger.access())
app.use(bodyParser())
app.use(authorization)
app.use(router.routes())
app.use(router.allowedMethods())
app.use(compress())

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

process.on('uncaughtException', (exception) => {
  console.log(exception)
})

process.on('unhandledRejection', (reason) => {
  console.error(reason)
})

server.listen(process.env.PORT || 3000)

module.exports = app
