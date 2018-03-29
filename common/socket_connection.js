const { connection, client } = require('./socket_client')
const SocketProto = require('./socket_protobuf')

connection()

const writer = module.exports.writer = async (obj) => {
  const w = await SocketProto.encode('demo', 'Message', obj)
  client.write(w)
}

const reader = module.exports.reader = async (obj) => {
  const r = await SocketProto.decode('demo', 'Message', obj)
  return r
}

client.on('data', (buf) => {
  SocketProto.decode('demo', 'Message', buf)
})

const chooseFnByMsgid = (msgId, obj = {}) => {
  console.log('msgId: ', msgId)
  switch (msgId) {
    case 1:
      writer(obj)
      break
    case 2:
      writer(obj)
      break;
    case 3:
      writer(obj)
      break
    default:
      console.log('noting to do: ', msgId)
      break
  }
}

// chooseFnByMsgid(1, 
//   {
//     Field: "String"
//   }
// )

module.exports = chooseFnByMsgid