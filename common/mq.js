const amqp = require('amqp')

const connection = amqp.createConnection(MQ_ACCOUNT.MQ_OPTIONS)
const MQ_ACCOUNT = require('../config').MQ_ACCOUNT

class MQ {
  constructor(queue, exchange, eName, qName) {
    this.queue = queue || null
    this.exchange = exchange || null
    this.qName = qName || ''
    this.eName = eName || ''
  }

  async publish(routingKey, message, options) {
    return new Promise((resolve, reject) => {
      this.exchange.publish(routingKey, message, options, () => {
        if(''){

        }
      })
    })
  }

  async subscribe() {

  }

  async destroye() {

  }

}

const mq = new MQ()

connection.on('error', async (err) => {
  console.log(`############ MQ CONN ERROR ON ${new Date()} ############`, err)
})

connection.on('ready', () => {
  connection.queue(MQ_ACCOUNT.QUEUE_NAME, { durable: true }, 
    (queue) => {
    queue.bind(MQ_ACCOUNT.EXCHANGE_NAME, MQ_ACCOUNT.ROUTE_NAME)

    queue.subscribe({ ack: true, prefetchCount: 1 }, async (message, headers, deliveryInfo, ack) => {

      console.log('############ MQ format message data ############', message)
      console.log('############ MQ headers headers data ############', headers)
      console.log('############ MQ headers deliveryInfo data ############', deliveryInfo)

      try {
        const data = recieveData(headers, message)
        ack.acknowledge(true)
      } catch (err) {
        ack.acknowledge(false)
        console.log('############ MQ err format message data ############', err)
      }
    })
  })

})

const recieveData = () => {}

process.on('exit', (code) => {
  console.log(`############ WEB SERVER EXIT ON ${new Date()} ############`, code)
  console.log(`############ MQ CLIENT DISCONNECT ON ${new Date()} ############`, code)

  connection.disconnect()

})