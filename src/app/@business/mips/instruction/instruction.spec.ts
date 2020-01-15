import {InstructionFactory} from './factories/instruction-factory';

describe('Instruction', () => {
    it('parses OP field', () => {
        const instruction = InstructionFactory.fromSymbolic('bne $1, $0, 1024');

        expect(instruction.op).toBe('000101');
    });
});
