// However, they do remember a few key facts about the password:

// It is a six-digit number.
// The value is within the range given in your puzzle input.
// Two adjacent digits are the same (like 22 in 122345).
// Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).

// Your puzzle input is 165432-707912

// An Elf just remembered one more important detail: the two adjacent matching digits are not part of a larger group of matching digits.

// Given this additional criterion, but still ignoring the range rule, the following are now true:

// 112233 meets these criteria because the digits never decrease and all repeated digits are exactly two digits long.
// 123444 no longer meets the criteria (the repeated 44 is part of a larger group of 444).
// 111122 meets the criteria (even though 1 is repeated more than twice, it still contains a double 22).

function findPassword() {
  let count = 0
  for (let i = 165432; i <= 707912; i++) {
    if (adjacentDigits(i) && doesNotDecrease(i)) {
      count++
    }
  }
  return count
}

function doesNotDecrease(num) {
  return num === parseInt(num.toString().split('').map(x => parseInt(x)).sort().join(''))
}

function adjacentDigits(num) {
  let array = num.toString().split('')
  return array.some((val, index, array) => {
    return (val === array[index + 1] && val !== array[index - 1]) && (val !== array[index + 2])
  })
}

console.log(adjacentDigits(111122))

console.log(findPassword())
