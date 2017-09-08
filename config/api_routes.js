module.exports.routes = [
  { verb: 'GET',    path: '/verb/get',    fn: 'verb.verbGetOnThisRequest',   desc: '测试GET' },
  { verb: 'POST',   path: '/verb/post',   fn: 'verb.verbPostOnThisRequest',  desc: '测试POST' },
  { verb: 'PUT',    path: '/verb/put',    fn: 'verb.verbPutOnThisRequest',   desc: '测试PUT' },
  { verb: 'PUT',    path: '/verb/delete', fn: 'verb.verbDeleteOnThisRequest',desc: '测试DELETE' },

  { verb: 'GET',    path: '/embedded',    fn: 'embedded.verbGetOnThisEmbedded',  desc: '嵌入式测试' },

]
