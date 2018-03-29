const assert = require('assert')
const authcode = require('../../common/authcode')

describe('socket_connection', () => {
  let stringD = 111111111
  let stringE = 1

  it('encode', () => {
    stringE = authcode.encode(stringD, 'key')
  })

  it('decode', () => {
    const d = authcode.decode(stringD, 'key')
    console.log(d === stringE)
  })
})