const validator = require('validator')

module.exports = {

  '/v1/verb/get': [
    { accept: 'PlateType', required: true, type: 'Number', desc: '', },
    { accept: 'QryTm', required: true, type: 'Number', desc: '' },
    { accept: 'Lmt', required: true, type: 'Number', desc: '' },
  ],

  '/v1/verb/post': [
    { accept: 'PlateEi', required: true, type: 'Number', desc: '', },
    { accept: 'QryTm', required: true, type: 'Number', desc: '' },
    { accept: 'Lmt', required: false, type: 'Number', desc: '' },
  ],

  '/v1/verb/put': [
    { accept: 'PlateEi', required: true, type: 'Number', desc: '', },
    { accept: 'QryTm', required: true, type: 'Number', desc: '' },
    { accept: 'Lmt', required: false, type: 'Number', desc: '' },
  ],

  '/v1/verb/delete': [
    { accept: 'PlateEi', required: true, type: 'Number', desc: '', },
    { accept: 'QryTm', required: true, type: 'Number', desc: '' },
    { accept: 'Lmt', required: false, type: 'Number', desc: '' },
  ],

  '/v1/embedded': [
    { accept: 'PlateEi', required: true, type: 'Number', desc: '', },
    { accept: 'QryTm', required: true, type: 'Number', desc: '' },
    { accept: 'Lmt', required: false, type: 'Number', desc: '' },
  ],

}
