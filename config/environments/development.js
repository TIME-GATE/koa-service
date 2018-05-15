module.exports = {
  database: {
    mongodb: {
      db: 'mongodb://127.0.0.1/mobile_dev',
      dbName: 'hello-world',
      defaultLimit: 1000
    },
    
    mysql: {
      host: '127.0.0.1',
      port: 3306,
      database: 'hello-world',
      username: 'admin',
      password: '*' 
    },
 
    redis: {
      host: '192.168.77.55',
      port: 6379,
      options: {}
    },

    elasticsearch: {
      host: 'http://127.0.0.1:9200',
      log: 'error'
    }
  },

  mongoose: {
    schemaConfig: {
      autoIndex: true
    }
  },

  loggerDir: './logs', 

  allowedOrigins: [
  ],
  
  clientSignToken: {
    web: "ytxbdadp5a3o1c7yvXRbMX7gVNFqEtwusd7qweb",
    ios: "ytxbdadp5a3o1c7yvXRbMX7gVNFqEtwusd7qios",
    android: "ytxp5a3o1c7yvXRbMX7gVNFqEtwusd7qand",
  },

  httpProxy: {
  },
  
  msgIdConfig: {
    basemsg: {
      req: { pName: 'demo', mName: 'Message' },
      res: { pName: 'demo', mName: 'Message' },
    },
    1: {
      req: { pName: 'demo', mName: 'Message' },
      res: { pName: 'demo', mName: 'Message' },
    },
    2: {
      req: { pName: 'demo', mName: 'Message' },
      res: { pName: 'demo', mName: 'Message' },
    },
    3: {
      req: { pName: 'demo', mName: 'Message' },
      res: { pName: 'demo', mName: 'Message' },
    }
  },

  MQ_ACCOUNT = {
    QUEUE_NAME: 'queue.name',
    EXCHANGE_NAME: 'exchange.name',
    ROUTE_NAME: 'route.name',
    MQ_OPTIONS: {
      host: '127.0.0.1',
      port: 5673,
      login: 'guest',
      password: 'jessica',
      connectionTimeout: 1000,
      vhost: '/',
      noDelay: true,
      heartbeat: 60,
    },
  },
}

