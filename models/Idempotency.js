const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')
const uniqueValidator = require('mongoose-unique-validator')

const config = require('../config/config')

const IdempotencySchema = new mongoose.Schema({
  id: { 
    type: String, 
    required: true, 
    unique: true 
  },
  fileType: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  size: { 
    type: Number, 
    required: true 
  },
  version: { 
    type: Number, 
    required: true, 
    default: 0 
  }
}, config.mongoose.schemaConfig)

IdempotencySchema.plugin(timestamps)
IdempotencySchema.plugin(uniqueValidator)

mongoose.model('Idempotency', IdempotencySchema)

module.exports = mongoose.model('Idempotency')