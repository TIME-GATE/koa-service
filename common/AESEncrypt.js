const crypto = require('crypto')

class AESEncrypt {

  assembleCode(data, key = '', iv = '', operation) {
    if (!data) return null

    try {
      switch (operation) {
        case 'decrypt':
          const decipher = crypto.createDecipheriv('aes-128-cbc', key, new Buffer(iv, 'utf-8'))
          return decipher.update(data, 'hex', 'utf8') + decipher.final('utf8')
        case 'encrypt':
          const cipher = crypto.createCipheriv('aes-128-cbc', key, new Buffer(iv, 'utf-8'))
          return cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
      }
    } catch (err) {
      console.log(err)
      return null
    }
  }

  encrypt(str, key, iv) {
    return this.assembleCode(str, key, iv, 'encrypt')
  }

  decrypt(str, key, iv) {
    return this.assembleCode(str, key, iv, 'decrypt')
  }

}

module.exports = new AESEncrypt()