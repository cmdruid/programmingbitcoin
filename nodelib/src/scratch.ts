import { randBigInt } from './lib/random'
import { mod, pow } from './lib/math'

let bn = randBigInt()

let sol = pow(2n,8n,32n)

console.log(sol)