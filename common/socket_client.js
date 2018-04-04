/**
 * 1、动态加载protobuf
 * 2、socket数据流断包、粘包处理(TODO)
 * 3、心跳机制、及断线重连
 */

const net = require('net')

const [HOST, PORT] = ['127.0.0.1', 9999]

const client = new net.Socket()

const connection = () => {
  client.connect(PORT, HOST, () => { console.log('CONNECTED TO: ' + HOST + ':' + PORT)})
}

client.on('data', (data) => {
  console.log(`${HOST}:${PORT} CONNECT DATA: `, data)
})

client.on('error', (e) => {
  console.log(`${HOST}:${PORT} CONNECT ERROR: ` + e)
})

client.on('timeout', (e) => {
  console.log(`${HOST}:${PORT} CONNECT TIMEOUT: ` + e)
})

client.on('end', (e) => {
  console.log(`${HOST}:${PORT} CONNECT END: ` + e)
})

client.on('close', (e) => {
  console.log(`${HOST}:${PORT} CONNECT CLOSE: ` + e)
  
  if (client.destroyed) {
    client.destroy()
  }

  setTimeout(connection, 3000)
})

process.on('exit', () => {
  client.destroy()

  client.on('close', () => {
    console.log('Connection closed')
  })

})

// 连接 客户端
module.exports = { connection, client }