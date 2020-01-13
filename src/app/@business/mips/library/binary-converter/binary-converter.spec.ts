import { BinaryConverter } from './binary-converter';
import { OverflowException } from '../exceptions/overflow-exception';

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
        expect(BinaryConverter.flip('101')).toBe('010');
        expect(BinaryConverter.flip('0')).toBe('1');
        expect(BinaryConverter.flip('')).toBe('');
    });

    it('converts binary representation to twos complement', () => {
        expect(BinaryConverter.twosComplement(5, 8)).toBe('01111011');
        expect(BinaryConverter.twosComplement(0, 8)).toBe('00000000');
        expect(BinaryConverter.twosComplement(-4, 8)).toBe('11111100');
        expect(BinaryConverter.twosComplement(-18, 8)).toBe('11101110');
        expect(() => BinaryConverter.twosComplement(8, 4)).toThrow(new OverflowException(8, 4));
    });

    it('converts binary representation to base 10 number', () => {
        expect(BinaryConverter.fromBinary('101')).toBe(5);
        expect(BinaryConverter.fromBinary('0')).toBe(0);
        expect(BinaryConverter.fromBinary('111')).toBe(7);
    });

    it('converts two\'s complement to base 10 number', () => {
        expect(BinaryConverter.fromTwosComplement('011')).toBe(5);
        expect(BinaryConverter.fromTwosComplement('000')).toBe(0);
        expect(BinaryConverter.fromTwosComplement('11101110')).toBe(-18);
    });
});
