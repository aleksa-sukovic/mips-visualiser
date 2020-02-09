import { InstructionEncoder } from './instruction-encoder';
import { InstructionNotFoundException } from '../exceptions/instruction-not-found-exception';

describe('Instruction encoder', () => {
    let encoder;

    beforeAll(() => encoder = new InstructionEncoder());

    it('parses available instructions', () => {
        const instruction1 = 'add $1, $2, $3';
        const instruction2 = 'beq $v1, $zero, 256';
        const instruction3 = 'j 1024';
        const instruction4 = 'lw $v0, 256($v1)';

        const binary1 = '000000,00010,00011,00001,00000,100000';
        const binary2 = '000100,00000,00011,0000000100000000';
        const binary3 = '000010,00000000000000010000000000';
        const binary4 = '100011,00011,00010,0000000100000000';

        expect(encoder.encode(instruction1)).toBe(binary1.replace(/,/g, ''));
        expect(encoder.encode(instruction2)).toBe(binary2.replace(/,/g, ''));
        expect(encoder.encode(instruction3)).toBe(binary3.replace(/,/g, ''));
        expect(encoder.encode(instruction4)).toBe(binary4.replace(/,/g, ''));
    });

    it('throws exceptions if instruction is not found', () => {
        const instruction1 = 'nope $1, $2, $3';
        const instruction2 = 'bex $1, $2, 1024';

        expect(() => encoder.encode(instruction1)).toThrow(new InstructionNotFoundException('nope $1, $2, $3'));
        expect(() => encoder.encode(instruction2)).toThrow(new InstructionNotFoundException('bex $1, $2, 1024'));
    });
});
