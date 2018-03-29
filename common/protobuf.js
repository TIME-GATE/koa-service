const protobuf = require('protobufjs')
const protoPath = '/Users/dreamboad/Projects/koa-service/message/'

class Proto {

  async loadByName(protoName, messageName, obj, type) {
    return new Promise((resolve, reject) => {
      protobuf.load(`${protoPath}${protoName}.proto`, (err, root) => {

        if (err) {
          return console.log(err) || resolve()
        }

        const data = root.lookupType(`${protoName}.${messageName}`)

        if (type === 'encode' && data.verify(obj)) {
          return console.log('encode err') || resolve()
        }

        switch (type) {
          case 'decode':
            return resolve(data.toObject(data.decode(obj), { objects: true }))
          case 'encode':
            return resolve(data.encode(data.create(obj) || '').finish())
        }
      })
    })
  }

  async deserialize(protoName, messageName, obj) {
    return await this.loadByName(protoName, messageName, obj, 'decode')
  }

  async serialize(protoName, messageName, obj) {
    return await this.loadByName(protoName, messageName, obj, 'encode')
  }

}

module.exports = new Proto()
