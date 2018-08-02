/*
 * apm
 */
//require('newrelic')

const Koa = require('koa')
const router = require('koa-router')()

const compress = require('koa-compress')
const bodyParser = require('koa-bodyparser')

const csrf = require('koa-csrf')
const cors = require('koa-cors')

const Helpers = require('./common/helper')
const config = require('./config')
const authorization = require('./api/middlewares/authorization')
const validate = require('./api/middlewares/api_validate')
const { tracer } = require('./common/tracing_zipkin')
const tracing = require('./api/middlewares/tracing_zipkin')

// require('./schedules')

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
 * validate: 参数验证
 * authorization 认证中间件
 * router: 请求路由
 */
app.use(cors())
app.use(config.logger.access())
app.use(bodyParser())
app.use(validate)
app.use(authorization)
// app.use(tracing.tracingMid1)
// app.use(tracing.tracingMid2)
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
