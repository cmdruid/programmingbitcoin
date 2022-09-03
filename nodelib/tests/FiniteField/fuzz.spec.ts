import { FieldElement } from '@class/FiniteField'
import { randProblemSet } from '@lib/fuzz'

describe('FiniteField', () => {
  describe('fuzz test', () => {
    const prime = BigInt(2**256 - 2**32 - 577)

    test('add() should handle fuzzing', () => {
      randProblemSet('add', prime).forEach(({ base, num, solution }) => {
        const a = new FieldElement(base, prime)
        expect(a.add(num).num).toEqual(solution)
      })
    })

    test('sub() should handle fuzzing', () => {
      randProblemSet('sub', prime).forEach(({ base, num, solution }) => {
        const a = new FieldElement(base, prime)
        expect(a.sub(num).num).toEqual(solution)
      })
    })

    test('mul() should handle fuzzing', () => {
      randProblemSet('mul', prime).forEach(({ base, num, solution }) => {
        const a = new FieldElement(base, prime)
        expect(a.mul(num).num).toEqual(solution)
      })
    })

    test('div() should handle fuzzing', () => {
      randProblemSet('div', prime).forEach(({ base, num, solution }) => {
        const a = new FieldElement(base, prime)
        expect(a.div(num).num).toEqual(solution)
      })
    })

    test('pow() should handle fuzzing', () => {
      randProblemSet('pow', prime).forEach(({ base, num, solution }) => {
        const a = new FieldElement(base, prime)
        expect(a.pow(num).num).toEqual(solution)
      })
    })
  })
})