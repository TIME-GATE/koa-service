const { tracer, zipkinFetch, ctxImpl } = require('../../common/tracing_zipkin')

module.exports = async function (ctx, next) {
  // const data = await zipkinFetch(`http://www.baidu.com`)
  // console.log(data)
  
  ctxImpl.scoped(() => {
    let error

    try {
      tracer.local({}, () => {
        throw new Error('no smoothies. try our cake')
      })
    } catch (err) {
      error = err // error wasn't swallowed
    }
  })
  return next()
}