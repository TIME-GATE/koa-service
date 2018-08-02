const path = require('path')
const protocol = require('./protocol')

module.exports = {
  
  accept: (data, accepts) => { 
    return protocol.accept(data, accepts) 
  },

  entity: (data, entitys) => { 
    return protocol.entity(data, entitys) 
  }
  
}

const validateConfig = [
  'embedded',
  'filter',
  'guarantee',
]

validateConfig.map((modelName) => {
    exports[modelName] = require(path.join(__dirname, modelName))
})

