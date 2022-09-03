import { randBigInt } from "./random"
import { mod, pow } from "./math"

export function randProblemSet(
  op    : string,
  prime : bigint,
  len   : number = 100
  ) {

  const problemSet = []

  for (let i = 0; i < len; i++) {
    const base = mod(randBigInt(), prime),
          num  = mod(randBigInt(), prime)
    
    let solution

    switch(op) {
      case 'add':
        solution = mod(base + num, prime)
        break
      case 'sub':
        solution = mod(base - num, prime)
        break
      case 'mul':
        solution = mod(base * num, prime)
        break
      case 'pow':
        solution = pow(base, num, prime)
        break
      case 'div':
        solution = mod(base * pow(num, prime - 2n, prime), prime)
        break
      default:
        throw 'You did not specify a valid operation!'
    }

    problemSet.push({ base, num, solution })
  }

  return problemSet
}