const fs = require('fs')
const readline = require('readline-sync')

const readFile = path => {
  const buffer = fs.readFileSync(path)
  return buffer.toString().trim()
}

const intCode = memory => {
  const instructions = {
    1: {
      instruction: ([aMode, bMode], a, b, address) => {
        memory[address] = (aMode ? a : memory[a]) + (bMode ? b : memory[b])
      },
      parameterCount: 3
    },
    2: {
      instruction: ([aMode, bMode], a, b, address) => {
        memory[address] = (aMode ? a: memory[a]) * (bMode ? b : memory[b])
      },
      parameterCount: 3
    },
    3: {
      instruction: ([aMode], a) => {
        const value = readline.question('Enter a value: ')
          memory[a] = parseInt(value)
      },
      parameterCount: 1
    },
    4: {
      instruction: ([aMode], a) => {
        console.log(memory[a])
      },
      parameterCount: 1
    }
  }

  let pointer = 0
  while (memory[pointer] !== 99) {
    const instructionValue = memory[pointer].toString()
    const instructionCode = parseInt(instructionValue.slice(-2))
    const { instruction, parameterCount } = instructions[instructionCode]
    const parameterModes = instructionValue.slice(0, -2).split('').reverse().map(x => parseInt(x))
    while (parameterModes.length < parameterCount) {
      parameterModes.push(0)
    }
    if (!instruction) {
      throw new Error('invalid instruction')
    }
    const parameters = []
    for (let i = 1; i <= parameterCount; i++) {
      parameters.push(memory[pointer + i])
    }
    instruction(parameterModes, ...parameters)
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