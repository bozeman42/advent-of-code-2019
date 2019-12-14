const path = require('path')

const utils = require('../utils')

const fuelCalc = mass => {
  return Math.floor(mass / 3) - 2
}

const data = utils.readFile('./01/input.txt')
  .split('\r\n')
  .map(x => parseInt(x))

console.time('D1Q1')
const answer1 = data
  .reduce((total, moduleMass) => {
    return fuelCalc(moduleMass) + total
  }, 0)
console.log(`Day 1, Q1: ${answer1}`)
console.timeEnd('D1Q1')
console.log('')
console.time('D1Q2')
const fuelRequirements = data.map(moduleMass => {
  let totalFuel = 0
  let mass = moduleMass
  while (fuelCalc(mass) > 0) {
    mass = fuelCalc(mass)
    totalFuel += mass
  }
  return totalFuel
})

const totalFuelRequirements = fuelRequirements.reduce((a, b) => a + b)

console.log(`Day 1, Q2: ${totalFuelRequirements}`)
console.timeEnd('D1Q2')