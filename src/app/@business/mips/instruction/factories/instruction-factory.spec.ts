import { InstructionFactory } from './instruction-factory';
import { Instruction } from '../instruction';

describe('Instruction factory', () => {
    it('creates instruction from symbolic representation', () => {
        const instruction = 'add $1, $2, $3';

        expect(InstructionFactory.fromSymbolic(instruction))
            .toEqual(jasmine.any(Instruction));
    });

    it('creates instruction from binary representation', () => {
        const instruction = '100011,00010,00001,0000000000001000'; // lw $1, 8($2)

        expect(InstructionFactory.fromBinary(instruction.replace(/,/g, '')))
            .toEqual(jasmine.any(Instruction));
    });
});
