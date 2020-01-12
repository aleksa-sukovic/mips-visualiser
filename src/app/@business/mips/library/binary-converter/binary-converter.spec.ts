import { BinaryConverter } from './binary-converter';

describe('Binary Converter ', () => {
    it('converts base 10 number to binary', () => {
        expect(BinaryConverter.fromBase10(7)).toBe('111');
        expect(BinaryConverter.fromBase10(0)).toBe('0');
        expect(BinaryConverter.fromBase10(5)).toBe('101');
    });

    it('add adds zero padding to result', ()  => {
        expect(BinaryConverter.fromBase10(7, 5)).toBe('00111');
        expect(BinaryConverter.fromBase10(0, 5)).toBe('00000');
        expect(BinaryConverter.fromBase10(3, 2)).toBe('11');
        expect(BinaryConverter.fromBase10(5, 1)).toBe('101');
    });

    it('converts binary representation to ones complement', () => {
        expect(BinaryConverter.onesComplement('101')).toBe('010');
        expect(BinaryConverter.onesComplement('0')).toBe('1');
        expect(BinaryConverter.onesComplement('')).toBe('');
    });

    it('converts binary representation to twos complement', () => {
        expect(BinaryConverter.twosComplement(5)).toBe('011');
    });
});
