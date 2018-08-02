const validator = require('validator')

module.exports = {

  'GET /v1/verb/get': [
    { accept: 'PlateType', required: true, type: 'Number', desc: '', },
    { accept: 'QryTm', required: true, type: 'Number', desc: '' },
    { accept: 'Lmt', required: true, type: 'Number', desc: '' },
  ],

  'POST /v1/verb/post': [
    { accept: 'PlateEi', required: true, type: 'Number', desc: '', },
    { accept: 'QryTm', required: true, type: 'Number', desc: '' },
    { accept: 'Lmt', required: false, type: 'Number', desc: '' },
  ],

  'PUT /v1/verb/put': [
    { accept: 'PlateEi', required: true, type: 'Number', desc: '', },
    { accept: 'QryTm', required: true, type: 'Number', desc: '' },
    { accept: 'Lmt', required: false, type: 'Number', desc: '' },
  ],

  'DELETE /v1/verb/delete': [
    { accept: 'PlateEi', required: true, type: 'Number', desc: '', },
    { accept: 'QryTm', required: true, type: 'Number', desc: '' },
    { accept: 'Lmt', required: false, type: 'Number', desc: '' },
  ],

  'GET /v1/embedded': [
    { accept: 'PlateEi', required: true, type: 'Number', desc: '', },
    { accept: 'QryTm', required: true, type: 'Number', desc: '' },
    { accept: 'Lmt', required: false, type: 'Number', desc: '' },
  ],

}
