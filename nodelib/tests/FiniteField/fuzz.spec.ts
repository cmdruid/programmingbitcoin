import { FieldElement } from '@class/FiniteField'

describe('FiniteField', () => {
  describe('fuzz test', () => {

    const prime = 17

    test('add() should handle fuzzing', () => {
      expect(a.add(b).sub(b).eq(a)).toEqual(true)
    })

    test('sub() should handle fuzzing', () => {
      expect(a.add(18n).num).toEqual(16n)
    })

    test('mul() should handle fuzzing', () => {
      expect(a.add(18n).num).toEqual(16n)
    })

    test('div() should handle fuzzing', () => {
      expect(a.add(18n).num).toEqual(16n)
    })

    test('pow() should handle fuzzing', () => {
      expect(a.add(18n).num).toEqual(16n)
    })
  })
})