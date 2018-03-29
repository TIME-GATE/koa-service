const { connection, client } = require('./socket_client')
const SocketProto = require('./socket_protobuf')
const config = require('../config/').msgIdConfig

connection()

const writer = module.exports.writer = async (protoName, messageName, obj) => {
  const w = await SocketProto.encode(protoName, messageName, obj)
  return client.write(w)
}

const reader = module.exports.reader = async (protoName, messageName, obj) => {
  const r = await SocketProto.decode(protoName, messageName, obj)
  return r
}

client.on('data', (buf) => {
  chooseFnByMsg('', 'head', buf)
})

const chooseFnByMsg = (msgId, type, obj) => {
  
  if (msgId) {
    if (!config[msgId] || !config[msgId].req || !config[msgId].res) {
      return console.log('noting to do: ', msgId)
    }
  }

  switch (type) {
    case 'head':
      return reader(config.head.res.pName, config.head.res.mName, obj)
    case 'write':
      return writer(config[msgId].req.pName, config[msgId].req.mName, obj)
    case 'read':
      return reader(config[msgId].res.pName, config[msgId].res.mName, obj)
    default:
      console.log('noting to do default: ', msgId)
      break
  }

}

chooseFnByMsg(1, 'write', { Field: "String" })

module.exports = chooseFnByMsg