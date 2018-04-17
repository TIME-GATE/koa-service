/**
 * 文本相似度
 *  预处理： 先进行分词、合并、降维等操作
 *  input： 各种源文本分词后转化为拼音
 *  output：根据simhash计算相似度TUDO, 目前计算距离即可
 */

const natural = require('natural')
const pinyin = require('pinyin')
const nodejieba = require('nodejieba')

nodejieba.load({
  stopWordDict: nodejieba.DEFAULT_STOP_WORD_DICT
})

const extract = (data, topN = 1000) => {
  const tmp = nodejieba.extract(data, topN)
  return tmp.sort((a, b) => { return a.word >= b.word})
}

const wordToPinYin = (data) => {
  const tmp = pinyin(data, { style: pinyin.STYLE_NORMAL })
  return tmp.reduce((a, c) => { return `${a}${c[0]}`})
}

const computeSimilarity = (compire, target) => {
  if ('string' != typeof compire || 'string' != typeof target) {
    return console.log(`need given String : ${compire} ${target}`) || 0
  }

  const c = extract(compire).map(i => { return wordToPinYin(i.word) }).join('')
  const t = extract(target).map(i => { return wordToPinYin(i.word) }).join('')

  return natural.JaroWinklerDistance(c, t)
}

module.exports = { computeSimilarity }
