/**
 * 文本相似度
 *  预处理： 先进行分词、合并、降维等操作
 *  input： 将各种源文本分词后转化为拼音
 *  output：根据simhash计算相似度TUDO, 目前计算距离、频率即可
 */

const natural = require('natural')
const pinyin = require('pinyin')
const nodejieba = require('nodejieba')

nodejieba.load({
  stopWordDict: nodejieba.DEFAULT_STOP_WORD_DICT
})

const extract = (data, type = 'extract', topN = 1000) => {
  let tmp = []

  switch (type) {
    case 'extract':
      tmp = nodejieba.extract(data, topN)
      break
    case 'cut':
      tmp = nodejieba.cut(data, topN).map(item => { return { word: item }})
      break
    case 'tag':
      tmp = nodejieba.tag(data, topN)
      break
    case 'cutAll':
      tmp = nodejieba.cutAll(data, topN).map(item => { return { word: item } })
      break
    default:
      break
  }

  return tmp.sort((a, b) => { return a.word >= b.word})
}

const wordToPinYin = (data) => {
  const tmp = pinyin(data, { style: pinyin.STYLE_NORMAL })
  return tmp.reduce((a, c) => { return `${a}${c[0]}`})
}

const computetJaccardSimilarity = (c, t, similarityCount = 0) => {
  c.forEach(item => { if (t.indexOf(item) > -1) similarityCount++ })
  return similarityCount / (c.length + t.length - similarityCount)
}

const computetJaroWinklerSimilarity = (compire, target) => {
  const [c, t] = [compire.join(''), target.join('')]
  return natural.JaroWinklerDistance(c, t)
}

const computetSimhashSimilarity = (compire, target) => {
  const c = compire.reduce((a, c) => { return `${a}${c.word.charCodeAt().toString(2) * c.word.weight}`})
  const t = target.reduce((a, c) => { return `${a}${c.word.charCodeAt().toString(2) * c.word.weight}` })

  return hammingDis(c, t)
}

const hammingDis = (x, y) => {
  let [dist, val] = [0, x ^ y]
  
  while (val != 0) {
    dist++
    val &= val - 1
  }

  return dist
}


const computeSimilarity = (compire, target, eType, sType = 'Jaccard') => {
  if ('string' != typeof compire || 'string' != typeof target) {
    return console.log(`need given String : ${compire} ${target}`) || 0
  }

  const c = extract(compire, eType).map(i => { return wordToPinYin(i.word) })
  const t = extract(target, eType).map(i => { return wordToPinYin(i.word) })

  switch (sType) {
    case 'Jaccard':
      return computetJaccardSimilarity(c, t)
    case 'JaroWinkler':
      return computetJaroWinklerSimilarity(c, t)  
    case 'Simhash':
      return computetSimhashSimilarity(c, t)
    default:
      return computetJaccardSimilarity(c, t)  
  }

}

module.exports = { 
  computeSimilarity,
  hammingDis,
 }