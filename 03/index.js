const utils = require('../utils')

const directionValue = letter => {
  switch(letter) {
    case 'U': return [  0, -1 ]
    case 'D': return [  0,  1 ]
    case 'R': return [  1,  0 ]
    case 'L': return [ -1,  0 ]
  }
}

const wirePaths = utils.readFile('./03/input.txt').split('\r\n').map(line => line.split(','))

const instructions = wirePaths.map(wirePath => {
  return wirePath.map(instruction => {
    const direction = directionValue(instruction[0])
    const value = parseInt(instruction.substring(1))
    return {
      direction,
      value
    }
  })
})

const manhattanDistance = ([x, y]) => Math.abs(x) + Math.abs(y)

function findIntersections (instructions) {
  let position = [0, 0]
  let [ wire1, wire2 ] = instructions
  const path1 = ['0,0']
  console.time('Build wire 1')
  wire1.forEach(instruction => {
    const [dx, dy] = instruction.direction
    for(let i = 0; i < instruction.value; i++) {
      const [x, y] = position
      position = [ x + dx, y + dy ]
      path1.push(`${position[0]},${position[1]}`)
    }
  })
  console.timeEnd('Build wire 1')
  position = [0,0]
  const intersections = new Set()
  const set1 = new Set(path1)
  const path2 = ['0,0']
  console.time('build wire 2')
  wire2.forEach(instruction => {
    const [dx, dy] = instruction.direction
    for(let i = 0; i < instruction.value; i++) {
      const [x, y] = position
      position = [ x + dx, y + dy ]
      const key = `${position[0]},${position[1]}`
      path2.push(key)
      if (set1.has(key) && key !== '0,0') {
        intersections.add(position)
      }
    }
  })
  console.timeEnd('build wire 2')
  console.time('earliest')
  const earliestPoint = [...intersections].reduce((shortest, point) => {
    const [ x, y ] = point
    const key = `${x},${y}`
    const path1Steps = path1.findIndex(x => x === key)
    const path2Steps = path2.findIndex(x => x === key)
    const steps = path1Steps + path2Steps
    return steps < shortest ? steps : shortest
  }, path1.length + path2.length)
  console.timeEnd('earliest')
  const closestPoint = [...intersections].reduce((closest, point) => {
    return manhattanDistance(point) < manhattanDistance(closest) ? point : closest
  })
  return {
    distance: manhattanDistance(closestPoint),
    steps: earliestPoint
  }
}

console.log(findIntersections(instructions))