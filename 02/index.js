const utils = require('../utils')

const data = utils.readFile('./02/input.txt')
  .split(',')
  .map(x => parseInt(x))

const newData = utils.setNounVerb(12, 2, data)
console.time('D2Q1')
const result = utils.intCode(newData)
console.timeEnd('D2Q1')
console.log(`Day 2, Q1: ${result}`)

function testNounsAndVerbs (target) {
  let verb = 0
  let noun = 0
  let value = 0
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100 && value < target; verb++) {
      let testData = utils.setNounVerb(noun, verb, data)
      value = utils.intCode(testData)
      if (value === target) return 100 * noun + verb
    }
  }
}

let nounVerbResult = testNounsAndVerbs(19690720)
console.log(nounVerbResult)