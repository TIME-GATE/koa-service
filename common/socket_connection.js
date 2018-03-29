const { connection, client } = require('./socket_client')
const SocketProto = require('./socket_protobuf')

connection()

const writer = module.exports.writer = (obj) => {
  const w = SocketProto.encode('finance', 'RequestDyna', obj)
  client.write(w)
}

const reader = module.exports.reader = (obj) => {
  const r = SocketProto.decode('finance', 'RequestDyna', obj)
  return r
}

client.on('data', (buf) => {
  SocketProto.decode('finance', 'RequestDyna', buf)
})

const chooseFnByMsgid = (msgId) => {
  switch (msgId) {
    case 'value':
      
      break;
  
    default:
      break;
  }
}