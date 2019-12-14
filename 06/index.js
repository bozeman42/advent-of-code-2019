const utils = require('../utils')

const data = utils.readFile('./06/input.txt')
  .split('\r\n')
  .map(item => item.split(')'))
  .map(arr => {
    return {
      planet: arr[1],
      orbits: arr[0]
    }
  })
  .reduce((obj, info) => {
    return {
      ...obj,
      [info.planet]: info.orbits
    }
  }, {})
  let count = 0
  let youPath = []
  let santaPath = []
  Object.keys(data)
  .forEach(orbit => {
    planet = data[orbit]
    count++
    while (planet !== 'COM') {
      planet = data[planet]
      if (orbit === 'YOU') {
        youPath.push(planet)
      } else if (orbit === 'SAN') {
        santaPath.push(planet)
      }
      count++
    }
  })
console.log(count)

const distance = youPath.reduce((distance, planet, youIndex) => {
  const santaIndex = santaPath.indexOf(planet)
  if (distance !== -1) return distance
  if (santaIndex !== -1) return youIndex + santaIndex + 2
  return distance
}, -1)

console.log(distance)