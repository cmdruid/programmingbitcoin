
export class FieldElement {
  public num: number
  public prime: number

  constructor(num: number, prime: number) {

    if (num >= prime || num < 0) {
      throw new Error(`Num ${num} not in field range 0 to ${prime - 1}`)
    }
    this.num   = num
    this.prime = prime
  }

  toString() {
    return `FieldElement_${this.prime}(${this.num})`
  }

  checkElement(elem: FieldElement) {
    if (!(elem && elem.num && elem.prime)) {
      throw new Error(
        `Invalid FieldElement: ${elem.toString()}`
        )
    }
    if (this.prime !== elem.prime) {
      throw new Error(
        `Primes do not match! ${this.prime} !== ${elem.prime}`
      )
    }
  }
  
  eq(other: FieldElement) {
    this.checkElement(other)
    return this.num === other.num 
      && this.prime === other.prime
  }

  ne(other: FieldElement) {
    return !this.eq(other)
  }

  add(other: FieldElement) {
    this.checkElement(other)
    const p   = this.prime,
          num = (((this.num + other.num) % p) + p) % p
    return new FieldElement(num, this.prime)
  }

  sub(other: FieldElement) {
    this.checkElement(other)
    const p   = this.prime,
          num = (((this.num - other.num) % p) + p) % p
    return new FieldElement(num, this.prime)
  }
}
