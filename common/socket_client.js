const { connection, client } = require('./socket')
const SocketProto = require('./socket_protobuf')

connection()

const writer = module.exports.writer = (obj) => {
  client.write(SocketProto.encode('finance', 'RequestDyna', obj))
}

const reader = module.exports.reader = (obj) => {
  SocketProto.decode('finance', 'RequestDyna', obj)
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