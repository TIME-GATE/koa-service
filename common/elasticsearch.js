const config = require('../config').database.elasticsearch
const elasticsearch = require('elasticsearch')

const esClient = new elasticsearch.Client(config)

module.exports.esClient = esClient

module.exports.esSearch = async (index = `index_name`, size = 10, from = 20, query = { match: { 'comments.content': '我' }}, sort = { '我': 'desc' }) => {
  const data = await esClient.search({
    index,
    body: {
      size, from, query, sort
    }
  })

  return data.hits.hits 
}

module.exports.esDeleteIndex = (index) => {
  return new Promise((resolve, reject) => {
    esClient.indices.delete({ index }, (err, response) => {
      if (err) {
        return console.log(err) || resolve({ code: -1, message: err })
      }
      return resolve({ data: response })
    })
  })
}

module.exports.esBulk = async (index, type, jsons) => {
  const bulkBody = []
  
  jsons.forEach((item) => {
    bulkBody.push({
      index: {
        _index: index,
        _type: type
      }
    })
    bulkBody.push(item)
  })

  return await esClient.bulk({ body: bulkBody })
}
