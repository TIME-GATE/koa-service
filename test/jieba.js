const nodejieba = require("nodejieba")
const TOP_N = 20000
console.time(1)
//const result = nodejieba.extract('请问如何申请', TOP_N)
const result = nodejieba.cut('请问如何申请')

console.log(result)

console.timeEnd(1)
