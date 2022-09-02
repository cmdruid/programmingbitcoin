const mod = (n: bigint, m: bigint) => (n % m + m) % m
export class FieldElement {

  public num: bigint
  public prime: bigint

  constructor (num: number | bigint, prime: number | bigint) {

    if (typeof num !== 'bigint') num = BigInt(num)
    if (typeof prime !== 'bigint') prime = BigInt(prime)

    if (num >= prime || num < 0n) {
      // If num is greater or equal to prime, or less than 0, it is invalid.
      //num = mod(num, prime)
      throw new Error(`Num ${num} not in field range 0 to ${prime - 1n}`)
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

  getNumber(number: FieldElement | number | bigint): bigint {
    if (number instanceof FieldElement) {
      this.checkElement(number)
      return number.num
    } else if (typeof(number) !== 'bigint') {
      return BigInt(number)
    } else {
      return number
    }
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

  add(other: FieldElement | number | bigint): FieldElement {
    // Add other element and return new element.
    const num = this.getNumber(other)
    const ans = mod(this.num + num, this.prime)
    return new FieldElement(ans, this.prime)
  }

  sub(other: FieldElement | number | bigint): FieldElement {
    // Subtract other element and return new element.
    const num = this.getNumber(other)
    const ans = mod(this.num - num, this.prime)
    return new FieldElement(ans, this.prime)
  }

  mul(other: FieldElement | number | bigint): FieldElement {
    // Multiply by other element and return new element.
    const num = this.getNumber(other)
    const ans = mod(this.num * num, this.prime)
    return new FieldElement(ans, this.prime)
  }

  div(other: FieldElement | number | bigint): FieldElement {
    // Divide by other element and return new element.
    const num = this.getNumber(other) ** (this.prime - 2n)
    const ans = mod(this.num * num, this.prime)
    return new FieldElement(ans, this.prime)
  }

  pow(other: FieldElement | number | bigint): FieldElement {
    // Exponentiate using number and return new element.
    const num = this.getNumber(other) ** (this.prime - 1n)
    const ans = mod(this.num ** num, this.prime)
    return new FieldElement(ans, this.prime)
  }
}
