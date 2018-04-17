const assert = require('assert')
const should = require("should")
const similarity = require('../../common/nlp').computeSimilarity

describe('socket_connection', () => {
  const com = '在自然语言处理过程中，经常会涉及到如何度量两个文本之间的相似性，我们都知道文本是一种高维的语义空间，如何对其进行抽象分解，从而能够站在数学角度去量化其相似性。而有了文本之间相似性的度量方式，我们便可以利用划分法的K-means、基于密度的DBSCAN或者是基于模型的概率方法进行文本之间的聚类分析；另一方面，我们也可以利用文本之间的相似性对大规模语料进行去重预处理，或者找寻某一实体名称的相关名称（模糊匹配）。而衡量两个字符串的相似性有很多种方法，如最直接的利用hashcode，以及经典的主题模型或者利用词向量将文本抽象为向量表示，再通过特征向量之间的欧式距离或者皮尔森距离进行度量。本文围绕文本相似性度量的主题'
  const tar = '基于密度的DBSCAN或者是基于模型的概率方法进行文本之间的聚类分析；另一方面，我们也可以利用文本之间的相似性对大规模语料进行去重预处理，或者找寻某一实体名称的相关名称（模糊匹配）。而衡量两个字符串的相似性有很多种方法，如最直接的利用hashcode，以及经典的主题模型或者利用词向量将文本抽象为向量表示，再通过特征向量之间的欧式距离或者皮尔森距离进行度量。本文围绕文本相似性度量的主题'
  
  it('should be 1 compire com and com', () => {
    similarity(com, com).should.equal(1)
    similarity('', '').should.equal(1)
  })

  it('should be 1 when compire chinese and pinyin', () => {
    similarity('中国', 'zhongguo').should.equal(1)
    similarity('中国a', 'zhongguo').should.equal(1)
  })

  it('should be >= 0.7 when compire com and tar', () => {
    assert(similarity(com, tar) >= 0.7)
  })

  it('should be >= 0.8 when compire com and tar', () => {
    assert(similarity('我爱中华', '爱我中华') >= 0.8)
    assert(similarity('我爱中国', '爱我中华') >= 0.8)
  })

  it('should be <= 0.8 when compire com and tar', () => {
    assert(similarity('中华', '中') <= 0.8)
    assert(similarity('中华', '中hua') <= 0.8)
  })

  it('should be 0 when compire type not string', () => {
    similarity(tar, {}).should.equal(0)
    similarity([], 1).should.equal(0)
  })

})