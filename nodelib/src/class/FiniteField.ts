const mod = (n: number, m: number) => (n % m + m) % m

export class FieldElement {

  public num: number
  public prime: number

  constructor (num: number, prime: number) {

    if (num >= prime || num < 0) {
      // If num is greater or equal to prime, or less than 0, it is invalid.
      //num = mod(num, prime)
      throw new Error(`Num ${num} not in field range 0 to ${prime - 1}`)
    }

    this.num = num
    this.prime = prime

  }

  toString(): string {
    // Convert object to string.
    return `FieldElement_${this.prime}(${this.num})`
  }

  checkElement(elem: FieldElement): void {
    // Check if an element is valid.
    if (!(elem && elem.prime)) {
      throw new Error(`Invalid FieldElement: ${elem}`)
    }
    if (this.prime !== elem.prime) {
      throw new Error(
        `Primes do not match! ${this.prime} !== ${elem.prime}`
      )
    }
  }

  getNumber(number: FieldElement | number): number {
    if (number instanceof FieldElement) {
      this.checkElement(number)
      number = number.num
    } 
    return number
  }
  
  eq(other: FieldElement): boolean {
    // Check if other element is equal.
    return this.num === other.num 
      && this.prime === other.prime
  }

  ne(other: FieldElement): boolean {
    // Check if other element is not equal.
    return !this.eq(other)
  }

  add(other: FieldElement | number): FieldElement {
    // Add other element and return new element.
    const num = this.getNumber(other)
    const ans = mod(this.num + num, this.prime)
    return new FieldElement(ans, this.prime)
  }

  sub(other: FieldElement | number): FieldElement {
    // Subtract other element and return new element.
    const num = this.getNumber(other)
    const ans = mod(this.num - num, this.prime)
    return new FieldElement(ans, this.prime)
  }

  mul(other: FieldElement | number): FieldElement {
    // Multiply by other element and return new element.
    const num = this.getNumber(other)
    const ans = mod(this.num * num, this.prime)
    return new FieldElement(ans, this.prime)
  }

  div(other: FieldElement | number): FieldElement {
    // Divide by other element and return new element.
    const num = Math.pow(this.getNumber(other), this.prime - 2)
    const ans = mod(this.num * num, this.prime)
    return new FieldElement(ans, this.prime)
  }

  pow(other: FieldElement | number): FieldElement {
    // Exponentiate using number and return new element.
    const num = mod(this.getNumber(other), this.prime - 1)
    const ans = mod(Math.pow(this.num, num), this.prime)
    return new FieldElement(ans, this.prime)
  }
}
