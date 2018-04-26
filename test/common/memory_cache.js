const assert = require('assert')
const should = require("should")
const { writeMemoryCache, readMemoryCache } = require('../../common/memory_cache')

describe('get or set memory cache', () => {
  const [key, obj, ttl] = ['demo', { name: 'memory_cache' }, 3000]

  it('should be ok', async () => {
    const mResult = await writeMemoryCache(key, obj, ttl)
    mResult.code.should.equal(0)
  })

  it('data should be memory_cache', async () => {
    const mResult = await readMemoryCache(key)
    mResult.code.should.equal(0)
    mResult.data.name.should.equal('memory_cache')
  })

  it('data should be expired', async function() { //TUDO
    const mResult = await readMemoryCache(key)
    mResult.data.name.should.equal('memory_cache')
  })

})