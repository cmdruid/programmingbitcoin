import { FieldElement } from '@class/FiniteField'

const prime = 17
const a = new FieldElement(15, prime)
const b = new FieldElement(13, prime)

console.log(a.add(13).num)