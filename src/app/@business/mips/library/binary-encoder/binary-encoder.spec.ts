import { BinaryEncoder } from './binary-encoder';
import { OverflowException } from '../exceptions/overflow-exception';

describe('Binary Converter ', () => {
    let converter: BinaryEncoder;

    beforeAll(() => {
        converter = new BinaryEncoder();
    });

    it('converts base 10 number to binary', () => {
        expect(converter.binary(7)).toBe('0111');
        expect(converter.binary(0)).toBe('0');
        expect(converter.binary(5)).toBe('0101');
    });

    it('adds result padding result', ()  => {
        expect(converter.binary(7, 5)).toBe('00111');
        expect(converter.binary(0, 5)).toBe('00000');
        expect(converter.binary(3, 3)).toBe('011');
        expect(converter.binary(-5, 4)).toBe('1011');
    });

    it('converts binary representation to ones complement', () => {
        expect(converter.flip('101')).toBe('010');
        expect(converter.flip('0')).toBe('1');
        expect(converter.flip('')).toBe('');
    });

    it('converts binary representation to twos complement', () => {
        expect(converter.binary(5, 8)).toBe('00000101');
        expect(converter.binary(0, 8)).toBe('00000000');
        expect(converter.binary(15, 8)).toBe('00001111');
        expect(converter.binary(-4, 8)).toBe('11111100');
        expect(converter.binary(-18, 8)).toBe('11101110');
        expect(() => converter.binary(8, 4)).toThrow(new OverflowException(8, 4));
    });

    it('converts binary representation to base 10 number', () => {
        expect(converter.number('1011')).toBe(-5);
        expect(converter.number('0')).toBe(0);
        expect(converter.number('000')).toBe(0);
        expect(converter.number('0101')).toBe(5);
        expect(converter.number('11101110')).toBe(-18);
    });

    it('pads with 0s', () => {
        expect(converter.signPad('01111', 10)).toBe('0000001111');
    });

    it('pads with 1s', () => {
        expect(converter.signPad('10000', 10)).toBe('1111110000');
    });
});
