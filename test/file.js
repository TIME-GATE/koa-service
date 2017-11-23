const fs = require('fs')
const text = fs.readFileSync('/Users/dreamboad/Projects/koa-service/data/labeled-data.csv', 'utf-8').split('\n')

console.log(text[0].split('\t'))
