const config = require('../config').database.elasticsearch
const elasticsearch = require('elasticsearch')

const esClient = new elasticsearch.Client(config)

const search = async (index = `index_name`, size = 10, from = 20, query = { match: { 'comments.content': '我' }}, sort = { '我': 'desc' }) => {
  const data = await esClient.search({
    index,
    body: {
      size, from, query, sort
    }
  })

  return data.hits.hits 
}

module.exports = {
  esClient,
  esSearch
}