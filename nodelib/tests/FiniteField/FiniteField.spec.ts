import { FieldElement } from '@src/FiniteField'

describe('FieldElement', () => {
  const a = new FieldElement(7, 13),
        b = new FieldElement(6, 13),
        c = new FieldElement(7, 13),
        d = new FieldElement(12, 13),
        e = new FieldElement(4, 13)

  describe('constructor()', () => {
    test('should fail with values out of range', () => {
      expect(() => new FieldElement(-1, 23)).toThrow(Error)
      expect(() => new FieldElement(37, 23)).toThrow(Error)
      expect(new FieldElement(0, 23)).toEqual({ "num": 0, "prime": 23 })
    })
  })

  describe('eq()', () => {
    test('should return false when the values are unequal', () => {
      expect(a.eq(b)).toEqual(false)
    })
    test('should return true when the values are equal', () => {
      expect(a.eq(c)).toEqual(true)
    })
  })

  describe('ne()', () => {
    test('should return true when the values are unequal', () => {
      expect(a.ne(b)).toEqual(true)
    })
    test('should return false when the values are equal', () => {
      expect(a.ne(c)).toEqual(false)
    })
  })

  describe('add()', () => {
    test('should perform proper field addition', () => {
      expect(a.add(b)).toEqual({"num": 0, "prime": 13})
      expect(a.add(c)).toEqual({"num": 1, "prime": 13})
    })
  })

  describe('sub()', () => {
    test('should perform proper field subtraction', () => {
      expect(a.sub(b)).toEqual({"num": 1, "prime": 13})
      expect(a.sub(d)).toEqual({"num": 8, "prime": 13})
    })
  })
})