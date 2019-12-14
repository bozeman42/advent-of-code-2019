const fs = require('fs')

const readFile = path => {
  const buffer = fs.readFileSync(path)
  return buffer.toString().trim()
}

const intCode = memory => {
  const instructions = {
    1: {
      instruction: (a, b, address) => {
        memory[address] = memory[a] + memory[b]
      },
      parameterCount: 3
    },
    2: {
      instruction: (a, b, address) => {
        memory[address] = memory[a] * memory[b]
      },
      parameterCount: 3
    }
  }

  let pointer = 0
  while (memory[pointer] !== 99) {
    const { instruction, parameterCount } = instructions[memory[pointer]]
    if (!instruction) {
      throw new Error('invalid instruction')
    }
    const parameters = []
    for (let i = 1; i <= parameterCount; i++) {
      parameters.push(memory[pointer + i])
    }
    instruction(...parameters)
    pointer += parameterCount + 1
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