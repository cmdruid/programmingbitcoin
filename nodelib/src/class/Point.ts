export class Point {

  public a: number
  public b: number
  public x: number
  public y: number

  constructor (
    x: number, 
    y: number, 
    a: number, 
    b: number
  ) {

    this.a = a
    this.b = b
    this.x = x
    this.y = y

    if (this.x === Infinity && this.y === Infinity) {
      // If point is at infinity, return early.                                        
      return this
    }

    if (Math.pow(this.y, 2) !== Math.pow(this.x, 3) + a * this.x + b) {
      // If point is not on the curve, throw an error.
      throw new Error(`(${this.x}, ${this.y}) is not on the curve!`)
    }

    return this
  }

  check(other: Point) {
    if (this.a !== other.a || this.b !== other.b) {
      throw new Error(`(${other.x}, ${other.y}) is not on the same curve!`)
    }
  }

  toString(): string {
    return `Point(x: ${this.x}, y: ${this.y}, a: ${this.a}, b: ${this.b})`
  }

  eq(other: Point): boolean {
    return (
      this.x === other.x && this.y === other.y
      && this.a === other.a && this.b === other.b
    )
  }

  ne(other: Point): boolean {
    return !this.eq(other)
  }

  add(other: Point): Point {
    // If the x-axis of one point is at infinity (vertical),
    // return the other point.
    if (this.x === Infinity) return other
    if (other.x === Infinity) return this

    // If the x-axis for both points are equal, but not the y-axis,
    // return a third point at infinity.
    if (this.x === other.x && this.y !== other.y) {
      return new Point(Infinity, Infinity, this.a, this.b)
    }

    // If the x-axis of both points are different,
    // return the third point using the slope of P1 and P2.
    if (this.x !== other.x) {
      let s  = (other.y - this.y) / (other.x - this.x),
          x3 = Math.pow(s, 2) - this.x - other.x,
          y3 = s * (this.x - x3) - this.y
      return new Point(x3, y3, this.a, this.b)
    }

    // If both points are equal, calculate the line tangent to the curve,
    // then return where the line intersects.
    if (this.eq(other)) {
      if (this.y === 0) {
        // Special case: If y is zero, instead return point at infinity.
        return new Point(Infinity, Infinity, this.a, this.b) 
      } else {
        let s  = (3 * Math.pow(this.x, 2) + this.a) / (2 * this.y),
            x3 = Math.pow(s, 2) - this.x * 2,
            y3 = s * (this.x - x3) - this.y
        return new Point(x3, y3, this.a, this.b)
      }
    }
    throw new Error(`Unable to find a solution for: ${other.toString()}`)
  }
}