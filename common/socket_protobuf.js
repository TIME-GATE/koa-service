/**
 *  序列化、反序列化
*/
const crypto = require('crypto')
const Proto = require('./protobuf')

class SocketProto {

  async doTranslation(obj, protoName, messageName, operation) {
    console.log(123)
    try {
      switch (operation) {
        case 'decode':
          return await Proto.deserialize(obj, protoName, messageName)
        case 'encode':
          return await Proto.serialize(obj, protoName, messageName)
      }
    } catch (error) {
      console.log(error)
    }

  }

  async decode(obj, protoName, messageName) {
    return await this.doTranslation(obj, protoName, messageName, 'decode')
  }

  async encode(obj, protoName, messageName) {
    return await this.doTranslation(obj, protoName, messageName, 'encode')
  }

}

module.exports = new SocketProto()