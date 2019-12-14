const fs = require('fs')

const readFile = path => {
  const buffer = fs.readFileSync(path)
  return buffer.toString().trim()
}

const intCode = memory => {
  const instructions = {
    1: {
      instruction: (a, b) => a + b,
      size: 4
    },
    2: {
      instruction: (a, b) => a * b,
      size: 4
    }
  }

  let pointer = 0
  while (memory[pointer] !== 99) {
    const { instruction, size } = instructions[memory[pointer]]
    if (!instruction) {
      throw new Error('invalid instruction')
    }
    const parameter1 = memory[memory[pointer + 1]]
    const parameter2 = memory[memory[pointer + 2]]
    memory[memory[pointer + 3]] = instruction(parameter1, parameter2)
    pointer += size
  }
  return memory[0]
}

const setNounVerb = (noun, verb, data) => {
  return data.map((value, index) => {
    if (index === 1) return noun
    if (index === 2) return verb
    return value
  })
}

module.exports = {
  readFile,
  intCode,
  setNounVerb
}