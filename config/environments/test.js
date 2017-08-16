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
      host: '127.0.0.1',
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
    web: "ytxbdad394fe6829e24b08b8ccf13b25719web",
    ios: "ytxbdad394fe6829e24b08b8ccf13b25719ios",
    android: "ytxbdad394fe6829e24b08b8ccf13b25719and",
  },

  httpProxy: {
  },
}

