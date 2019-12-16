const fs = require('fs')
const readline = require('readline-sync')

const readFile = path => {
  const buffer = fs.readFileSync(path)
  return buffer.toString().trim()
}

const ADDITION = 1
const MULTIPLICATION = 2
const INPUT = 3
const OUTPUT = 4
const JUMP_IF_TRUE = 5
const JUMP_IF_FALSE = 6
const LESS_THAN = 7
const EQUALS = 8
const TERMINATION = 99

class IntCode {
  constructor(memory) {
    this.memory = memory
    this.outputQueue = []
  }
}

const intCode = (memory, inputs = [], debug = false) => {
  let pointer = 0
  let advancePointer = true
  const val = (val, mode) => mode ? val : memory[val]
  const instructions = {
    [ADDITION]: {
      instruction: ([aMode, bMode], a, b, address) => {
        memory[address] = (val(a, aMode)) + (bMode ? b : memory[b])
      },
      parameterCount: 3
    },
    [MULTIPLICATION]: {
      instruction: ([aMode, bMode], a, b, address) => {
        memory[address] = (aMode ? a: memory[a]) * (bMode ? b : memory[b])
      },
      parameterCount: 3
    },
    [INPUT]: {
      instruction: ([aMode], a) => {
        let value
        if (inputs.length === 0) {
          value = readline.question('Enter a value: ')
        } else {
          value = inputs.shift()
        }
        memory[a] = parseInt(value)
      },
      parameterCount: 1
    },
    [OUTPUT]: {
      instruction: ([aMode], a) => {
        console.log(val(a, aMode))
        if (debug) {
          console.log(`Pointer: ${pointer}`)
        }
      },
      parameterCount: 1
    },
    [JUMP_IF_TRUE]: {
      instruction: ([aMode, bMode], a, b) => {
        const aVal = val(a, aMode)
        const bVal = val(b, bMode)
        if (aVal !== 0) {
          pointer = bVal
          advancePointer = false
        }
      },
      parameterCount: 2
    },
    [JUMP_IF_FALSE]: {
      instruction: ([aMode, bMode], a, b) => {
        const aVal = val(a, aMode)
        const bVal = val(b, bMode)
        if (aVal === 0) {
          pointer = bVal
          advancePointer = false
        }
      },
      parameterCount: 2
    },
    [LESS_THAN]: {
      instruction: ([aMode, bMode], a, b, address) => {
        const aVal = val(a, aMode)
        const bVal = val(b, bMode)
        memory[address] = aVal < bVal ? 1 : 0
      },
      parameterCount: 3
    },
    [EQUALS]: {
      instruction: ([aMode, bMode], a, b, address) => {
        const aVal = val(a, aMode)
        const bVal = val(b, bMode)
        memory[address] = aVal === bVal ? 1 : 0
      },
      parameterCount: 3
    }
  }

  while (memory[pointer] !== TERMINATION) {
    const instructionValue = memory[pointer].toString()
    const instructionCode = parseInt(instructionValue.slice(-2))
    const { instruction, parameterCount } = instructions[instructionCode]
    const parameterModes = instructionValue.slice(0, -2).split('').reverse().map(x => parseInt(x))
    while (parameterModes.length < parameterCount) {
      parameterModes.push(0)
    }
    const parameters = []
    for (let i = 1; i <= parameterCount; i++) {
      parameters.push(memory[pointer + i])
    }
    instruction(parameterModes, ...parameters)
    if (advancePointer) {
      pointer += parameterCount + 1
    }
    advancePointer = true
  }
  if (debug) {
    console.log(memory)
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