const readLine = require('readline-sync')
const utils = require('../utils')

const data = utils.readFile('./07/example1.txt')
  .split(',')
  .map(x => parseInt(x))

const amplifiers = ['A', 'B', 'C', 'D', 'E']

const phaseSettings = amplifiers.map(amp => {
  return readLine.question(`Enter phase setting for amplifier ${amp}: `)
})

amplifiers.forEach

console.log('A')
const aOut = utils.intCode(data, [phaseSettings[0], 0])
console.log('B')
const bOut = utils.intCode(data, [phaseSettings[1]])
console.log('C')
const cOut = utils.intCode(data, [phaseSettings[2]])
console.log('D')
const dOut = utils.intCode(data, [phaseSettings[3]])
console.log('E')
const eOut = utils.intCode(data, [phaseSettings[4]])

console.log('result: ', eOut)