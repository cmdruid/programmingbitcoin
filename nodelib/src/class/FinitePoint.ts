import { FieldElement } from "./FiniteField"


export class FinitePoint {

  public a: FieldElement
  public b: FieldElement
  public p: number
  public x: FieldElement
  public y: FieldElement

  constructor (
    x: number,
    y: number,
    p: number,
    a: number,
    b: number,
  ) {

    this.a = new FieldElement(a, p)
    this.b = new FieldElement(b, p)
    this.p = p
    this.x = new FieldElement(x, p)
    this.y = new FieldElement(y, p)

    if (this.x.num === Infinity && this.y.num === Infinity) {
      // If point is at infinity, return early.
      return this
    }

    if (this.y.pow(2) !== this.x.pow(3).add(this.x.mul(this.a)).add(this.b)) {
      // If point is not on the curve, throw an error.
      throw new Error(`(${this.x}, ${this.y}) is not on the curve!`)
    }

    return this
  }

  check(other: FinitePoint) {
    if (this.a.ne(other.a) || this.b.ne(other.b)) {
      throw new Error(`(${other.x}, ${other.y}) is not on the same curve!`)
    }
  }

  toString(): string {
    return `Point(x: ${this.x.num}, y: ${this.y.num})`
  }

  eq(other: FinitePoint): boolean {
    return (
      this.x.eq(other.x) && this.y.eq(other.y)
      && this.a.eq(other.a) && this.b.eq(other.b)
    )
  }

  ne(other: FinitePoint): boolean {
    return !this.eq(other)
  }

  add(other: FinitePoint): FinitePoint {
    // If the x-axis of one point is at infinity (vertical),
    // return the other point.
    if (this.x.num === Infinity) return other
    if (other.x.num === Infinity) return this

    // If the x-axis for both points are equal, but not the y-axis,
    // return a third point at infinity.
    if (this.x.num === other.x.num && this.y.num !== other.y.num) {
      return new FinitePoint(Infinity, Infinity, this.p, this.a.num, this.b.num)
    }

    // If the x-axis of both points are different,
    // return the third point using the slope of P1 and P2.
    if (this.x.num !== other.x.num) {
      let s  = other.y.sub(this.y).div(other.x.sub(this.x)),
          x3 = s.pow(2).sub(this.x).sub(other.x),
          y3 = s.mul(this.x.sub(x3)).sub(this.y)
      return new FinitePoint(x3.num, y3.num, this.p, this.a.num, this.b.num)
    }

    // If both points are equal, calculate the line tangent to the curve,
    // then return where the line intersects.
    if (this.eq(other)) {
      if (this.y.num === 0) {
        // Special case: If y is zero, instead return point at infinity.
        return new FinitePoint(Infinity, Infinity, this.p, this.a.num, this.b.num) 
      } else {
        let s  = this.x.pow(2).mul(3).add(this.a).div(this.y.mul(2)),
            x3 = Math.pow(s, 2) - this.x * 2,
            y3 = s * (this.x - x3) - this.y
        return new Point(x3, y3, this.a, this.b)
      }
    }
    throw new Error(`Unable to find a solution for: ${other.toString()}`)
  }
}