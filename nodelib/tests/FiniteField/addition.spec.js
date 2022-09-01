import { FieldElement } from '@class/FiniteField';
const mod = (n, m) => (n % m + m) % m;
describe('FiniteField', () => {
    describe('add()', () => {
        test('Addition and subtraction should equal the same result.', () => {
            const prime = 17;
            const a = new FieldElement(15, prime);
            const b = new FieldElement(13, prime);
            expect(a.add(13).num).toEqual(11);
            expect(b.sub(11).eq(a)).toEqual(true);
        });
    });
});
