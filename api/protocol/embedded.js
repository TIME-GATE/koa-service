const validator = require('validator')

module.exports = {

  unlockYourCplusJourney: [
    { accept: 'PlateType', required: true, type: 'Number', desc: '', },
    { accept: 'QryTm', required: true, type: 'Number', desc: '' },
    { accept: 'Lmt', required: true, type: 'Number', desc: '' },
  ],

  testParamsNocb: [
    { accept: 'PlateEi', required: true, type: 'Number', desc: '', },
    { accept: 'QryTm', required: true, type: 'Number', desc: '' },
    { accept: 'Lmt', required: false, type: 'Number', desc: '' },
  ],

  testFunctionNocb: [
    { accept: 'PlateEi', required: true, type: 'Number', desc: '', },
    { accept: 'QryTm', required: true, type: 'Number', desc: '' },
    { accept: 'Lmt', required: false, type: 'Number', desc: '' },
  ],

  testParamsFunctionNocb: [
    { accept: 'PlateEi', required: true, type: 'Number', desc: '', },
    { accept: 'QryTm', required: true, type: 'Number', desc: '' },
    { accept: 'Lmt', required: false, type: 'Number', desc: '' },
  ]

}