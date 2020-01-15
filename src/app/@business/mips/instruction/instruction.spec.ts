import {InstructionFactory} from './factories/instruction-factory';

describe('Instruction', () => {
    it('parses OP field', () => {
        const instruction = InstructionFactory.fromSymbolic('bne $1, $0, 1024');

        expect(instruction.op).toBe('000101');
    });

    it('parses RS field', () => {
        const instruction = InstructionFactory.fromSymbolic('add $1, $2, $3');

        expect(instruction.rs).toBe('00001');
    });

    it('parses RT field', () => {
        const instruction = InstructionFactory.fromSymbolic('add $1, $2, $3');

        expect(instruction.rt).toBe('00010');
    });

    it('parses RD field', () => {
        const instruction = InstructionFactory.fromSymbolic('add $1, $2, $3');

        expect(instruction.rd).toBe('00011');
    });

    it('parses shamt field', () => {
        const binary = '000000,00001,00010,00011,11000,000000';
        const instruction = InstructionFactory.fromBinary(binary.replace(/,/g, ''));

        expect(instruction.shamt).toBe('11000');
    });
});
