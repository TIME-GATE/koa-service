#!/usr/bin/env node

/**
 * js mapreduce
 * 
 * cat README.md | node mapreduce.js map | node mapreduce.js reduce
 */
const readline = require('readline')
const { extract } = require('./nlp')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const mapProcess = () => {
  rl.on('line', lineData => {
    extract(lineData, type = 'cut')
    .map(item => { console.log(item.word) })
  })

  rl.on('close', () => { process.exit(0) })

}

const reduceProcess = () => {
  const allWords = new Map()

  rl.on('line', word => {
    
    if (!allWords.has(word)) {
      return allWords.set(word, 1)
    }

    allWords.set(word, allWords.get(word) + 1)
  })

  rl.on('close', () => {
    allWords.forEach((k, v) => { console.log(`${v}:${k}`)})
    process.exit(0)
  })

}

switch (process.argv[2]) {
  case 'map':
    mapProcess()
    break
  case 'reduce':
    reduceProcess()
    break
  default:
    console.log('no cmd to be exec')
    process.exit()
    break
}