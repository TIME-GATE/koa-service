const net = require('net')
const SocketProto = require('./socket_protobuf')

const server = net.createServer()

server.on('connection', (client) => {
  console.log(client._handle.fd, new Date())

  client.on('data', async (data) => {
    console.log('proto from client: ', await SocketProto.decode('demo', 'Message', data))
  })

  client.on('end', (data) => {
    console.log('client quit from server end:')
  })

  client.on('close', (data) => {
    console.log('client quit from server close:')
  })

})

server.on('close', () => {
  console.log('关闭服务器。。。。。')
})

server.listen(9999)