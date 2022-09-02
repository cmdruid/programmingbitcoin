import { FieldElement } from '@class/FiniteField'

describe('FiniteField', () => {
  describe('add()', () => {

    const prime = 17

    test('Should handle: a + b - b = a', () => {
      const a = new FieldElement(15, prime)
      const b = new FieldElement(13, prime)
      expect(a.add(b).sub(b).eq(a)).toEqual(true)
    })

    test('Should handle nums greater than prime.', () => {
      const a = new FieldElement(15, prime)
      const b = new FieldElement(13, prime)
      expect(a.add(18n).num).toEqual(16n)
    })

    test('Should handle negative numbers.', () => {
      const a = new FieldElement(15, prime)
      const b = new FieldElement(13, prime)
      expect(a.add(18n).num).toEqual(16n)
    })

    test('Should handle numbers, bigints, and FieldElement objects.', () => {
      const a = new FieldElement(15, prime)
      const b = new FieldElement(13, prime)
      expect(a.add(18n).num).toEqual(16n)
    })
  })
})