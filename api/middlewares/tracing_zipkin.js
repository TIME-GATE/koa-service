const zipkin = require('zipkin')
const { HttpLogger } = require('zipkin-transport-http')
const CLSContext = require('zipkin-context-cls')

const ctxImpl = new CLSContext()

const recorder = new zipkin.BatchRecorder({
  logger: new HttpLogger({
    endpoint: `http://localhost:9411/api/v1/spans`
  })
})

const tracingMid1 = async function (ctx, next) {

  const tracer = new zipkin.Tracer({
    ctxImpl,
    recorder,
    localServiceName: 'koa-service-1'
  })

  ctxImpl.scoped(() => {
    
    const id = new zipkin.TraceId({
      traceId: new zipkin.option.Some('48485a3953bb6124'),
      spanId: '48485a3913bb6124',
      parentId: new zipkin.option.Some('48485a3953bb6121'),
      sampled: new zipkin.option.Some('3598a2cc24dc8316'),
    })
    
    // const req = zipkin.Request.addZipkinHeaders({}, id)

    tracer.setId(id)

    const result = tracer.local('middlewares-1', () => {
      tracer.recordBinary('demo', 'demo-1')
      return tracer.recordAnnotation(new zipkin.Annotation.ClientSend())
    })

  })

  return next()
}

const tracingMid2 = async function (ctx, next) {

  const tracer = new zipkin.Tracer({
    ctxImpl,
    recorder,
    localServiceName: 'koa-service-2'
  })

  ctxImpl.scoped(() => {

    const id = new zipkin.TraceId({
      traceId: new zipkin.option.Some('48485a3953bb6122'),
      spanId: '48485a3951bb6122',
      parentId: new zipkin.option.Some('48485a3953bb6121'),
      sampled: new zipkin.option.Some('3598a2cc24dc8315'),
    })

    // const req = zipkin.Request.addZipkinHeaders({}, id)

    tracer.setId(id)

    const result = tracer.local('middlewares-2', () => {
      return tracer.recordBinary('demo', 'demo-2')
      return tracer.recordAnnotation(new zipkin.Annotation.ClientSend())
    })

  })

  return next()
}

module.exports = {
  tracingMid1,
  tracingMid2
}