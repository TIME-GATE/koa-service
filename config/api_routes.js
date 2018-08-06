module.exports.routes = [
  
  // REST
  { verb: 'GET',    path: '/v1/verb/get',             fn: 'verb.verbGetOnThisRequest',          desc: '测试GET' },
  { verb: 'POST',   path: '/v1/verb/post',            fn: 'verb.verbPostOnThisRequest',         desc: '测试POST' },
  { verb: 'PUT',    path: '/v1/verb/put',             fn: 'verb.verbPutOnThisRequest',          desc: '测试PUT' },
  { verb: 'DELETE', path: '/v1/verb/delete',          fn: 'verb.verbDeleteOnThisRequest',       desc: '测试DELETE' },
  
  // EMBEDDED
  { verb: 'GET',    path: '/v1/embedded',             fn: 'embedded.unlockYourCplusJourney',    desc: '嵌入式测试' },
  { verb: 'GET',    path: '/v1/testParamsNocb',       fn: 'embedded.testParamsNocb',            desc: '传参数无回调返回' },
  { verb: 'GET',    path: '/v1/testFuncsNocb',        fn: 'embedded.testFunctionNocb',          desc: '传函数无回调返回' },
  { verb: 'GET',    path: '/v1/testParamsFuncsNocb',  fn: 'embedded.testParamsFunctionNocb',    desc: '传函数参数无回调返回' },
  
  // NEURAL NETWORK
  { verb: 'GET',    path: '/v1/testBrain',            fn: 'neural_network.testBrain',           desc: '测试神经网络' },

  // GUARANTEE
  { verb: 'POST',   path: '/v1/guarantee',            fn: 'guarantee.testGuarantee',           desc: '测试事务性保证' },

  // Similarity
  { verb: 'POST', path: '/v1/nlp/textSimilarity', fn: 'nlp.computeTextSimilarity', desc: '文本相似度' },

  { verb: 'GET', path: '/v1/filter', fn: 'filter.testFilter', desc: '测试filter' },

  // 接口幂等性 增删改查 idempotency
  { verb: 'GET',    path: '/v1/idempotency',  fn: 'idempotency.testFetchIdempotency', desc: '幂等查询' },
  { verb: 'DELETE', path: '/v1/idempotency',  fn: 'idempotency.testDelIdempotency',   desc: '幂等删除' },
  { verb: 'POST',   path: '/v1/idempotency',  fn: 'idempotency.testEditIdempotency',  desc: '幂等修改' },
  { verb: 'PUT',    path: '/v1/idempotency',  fn: 'idempotency.testAddIdempotency',   desc: '幂等添加' },

  // 二维码
  { verb: 'GET', path: '/v1/qr/image', fn: 'image.productImage', desc: '' },


]
