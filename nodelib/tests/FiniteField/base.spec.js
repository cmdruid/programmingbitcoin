import { FieldElement } from '@class/FiniteField';
const mod = (n, m) => (n % m + m) % m;
const genNum = (prime) => Math.floor(Math.random() * (prime - 1));
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
function genProblems(op, prime, len = 100) {
    const problems = [];
    for (let i = 0; i < len; i++) {
        const base = genNum(prime), num = genNum(prime);
        let solution;
        switch (op) {
            case 'add':
                solution = mod(base + num, prime);
                break;
            case 'sub':
                solution = mod(base - num, prime);
                break;
            case 'mul':
                solution = mod(base * num, prime);
                break;
            case 'pow':
                solution = mod(Math.pow(base, num), prime);
                break;
            case 'div':
                solution = mod(base * Math.pow(num, prime - 2), prime);
                break;
            default:
                throw 'You did not specify a valid operation!';
        }
        problems.push({ base, num, solution });
    }
    return problems;
}
describe('FieldElement', () => {
    const a = new FieldElement(7, 13), b = new FieldElement(6, 13), c = new FieldElement(7, 13);
    describe('constructor()', () => {
        test('should fail with values out of range', () => {
            expect(() => new FieldElement(-1, 23)).toThrow(Error);
            expect(() => new FieldElement(37, 23)).toThrow(Error);
            expect(new FieldElement(0, 23)).toEqual({ "num": 0, "prime": 23 });
        });
    });
    describe('eq()', () => {
        test('should return false when the values are unequal', () => {
            expect(a.eq(b)).toEqual(false);
        });
        test('should return true when the values are equal', () => {
            expect(a.eq(c)).toEqual(true);
        });
    });
    describe('ne()', () => {
        test('should return true when the values are unequal', () => {
            expect(a.ne(b)).toEqual(true);
        });
        test('should return false when the values are equal', () => {
            expect(a.ne(c)).toEqual(false);
        });
    });
    describe('add()', () => {
        test('should perform proper field addition', () => {
            const prime = 17;
            genProblems('add', prime).forEach(p => {
                let a = new FieldElement(p.base, prime), b = new FieldElement(p.num, prime);
                expect(a.add(b).num).toEqual(p.solution);
            });
        });
    });
    describe('sub()', () => {
        test('should perform proper field subtraction', () => {
            const prime = 23;
            genProblems('sub', prime).forEach(p => {
                let a = new FieldElement(p.base, prime), b = new FieldElement(p.num, prime);
                expect(a.sub(b).num).toEqual(p.solution);
            });
        });
    });
    describe('mul()', () => {
        test('should perform proper field multiplication', () => {
            const prime = 63;
            genProblems('mul', prime).forEach(p => {
                let a = new FieldElement(p.base, prime), b = new FieldElement(p.num, prime);
                expect(a.mul(b).num).toEqual(p.solution);
            });
        });
    });
    describe('pow()', () => {
        test('should perform proper field exponentiation', () => {
            const prime = 57;
            genProblems('pow', prime).forEach(p => {
                let a = new FieldElement(p.base, prime), b = p.num;
                expect(a.pow(b).num).toEqual(p.solution);
            });
        });
        test('should handle negative exponents', () => {
            const prime = 13;
            let a = new FieldElement(7, prime);
            expect(a.pow(-3).num).toEqual(8);
        });
    });
    describe('div()', () => {
        test('should perform proper field exponentiation', () => {
            const prime = 13;
            genProblems('div', prime).forEach(p => {
                let a = new FieldElement(p.base, prime), b = new FieldElement(p.num, prime);
                expect(a.div(b).num).toEqual(p.solution);
            });
        });
    });
});
