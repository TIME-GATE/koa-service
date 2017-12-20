const log4js = require('log4js')

class Logger {
  constructor(route = '../logs/log.log') {
    this.route = route
    this.log = log4js
  }

  setLogConfig() {
    this.log.configure({
      appenders: { cheese: { type: 'file', filename: this.route } },
      categories: { default: { appenders: ['cheese'], level: 'error' } }
    })
  }

  getLogger() {
    return this.log.getLogger(this.route)
  }
}

/**
 * logger.trace()
 * logger.debug()
 * logger.info()
 * logger.warn()
 * logger.error()
 * logger.fatal()
 */
module.exports = (route) => {
  const logger = new Logger(route)
  return logger.getLogger()
}