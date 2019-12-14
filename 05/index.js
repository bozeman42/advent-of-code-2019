const utils = require('../utils')

const data = utils.readFile('./05/input.txt')
  .split(',')
  .map(x => parseInt(x))

utils.intCode(data)