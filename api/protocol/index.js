const protocol = require('./protocol')

module.exports = {
  
  accept: (data, accepts) => { 
    return protocol.accept(data, accepts) 
  },

  entity: (data, entitys) => { 
    return protocol.entity(data, entitys) 
  }
  
}