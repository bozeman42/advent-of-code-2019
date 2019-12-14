const utils = require('../utils')

const data = utils.readFile('./02/input.txt')
  .split(',')
  .map(x => parseInt(x))

const newData = utils.setNounVerb(12, 2, data)
console.time('D2Q1')
const result = utils.intCode(newData)
console.timeEnd('D2Q1')
console.log(`Day 2, Q1: ${result}`)

