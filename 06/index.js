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
  Object.values(data)
  .forEach(orbit => {
    planet = orbit
    count++
    while (planet !== 'COM') {
      planet = data[planet]
      count++
    }
  })


console.log(count)
