const amqp = require('amqp')
const MQ_ACCOUNT = require('../config').MQ_ACCOUNT

const connection = amqp.createConnection(MQ_ACCOUNT.MQ_OPTIONS)

connection.on('error', async (err) => {
  console.log(`############ MQ CONN ERROR ON ${new Date()} ############`, err)
})

/**
 * 订阅subscribe
 * 
 */

module.exports.subscribeMqMsg = async (queueName, exchangeName, routeName, options, cb) => {
  return new Promise((resolve, reject) => {
    connection.on('ready', () => {
      connection.queue(queueName, { durable: true }, (queue) => {
        queue.bind(exchangeName, routeName)

        queue.subscribe({ ack: true, prefetchCount: 1 }, async (message, headers, deliveryInfo, ack) => {

          console.log('############ MQ format message data ############', message)
          console.log('############ MQ headers headers data ############', headers)
          console.log('############ MQ headers deliveryInfo data ############', deliveryInfo)

          try {
            ack.acknowledge(true)
            resolve(cb(message.toString()))
          } catch (error) {
            ack.acknowledge(false)
            console.log('error:', error)
          }
        })

      })
    })
  })
}


module.exports.publishMqMsg = async (exchangeName, routeName, msg, cb) => {
  return new Promise((resolve, reject) => {
    connection.on('ready', () => {
      connection.exchange(exchangeName, { durable: true }, (exchange) => {

        exchange.publish(routeName, msg, (res) => {
          resolve(res)
        })

      })
    })

  })
}


process.on('exit', (code) => {
  console.log(`############ WEB SERVER EXIT ON ${new Date()} ############`, code)
  console.log(`############ MQ CLIENT DISCONNECT ON ${new Date()} ############`, code)

  connection.disconnect()

})