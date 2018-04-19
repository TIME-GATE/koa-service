const assert = require('assert')
const should = require("should")
const AESEncrypt = require('../../common/AESEncrypt')

describe('encode --> decode', () => {

  it('should be 111', () => {
    const de = AESEncrypt.encrypt('111', 'fdfdfdfdfssdsdsd', '3232323232323233')
    AESEncrypt.decrypt(de, 'fdfdfdfdfssdsdsd', '3232323232323233').should.equal('111')
  })

})