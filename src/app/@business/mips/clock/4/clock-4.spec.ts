import { CPU } from '../../cpu/cpu';
import { Clock4 } from './clock-4';
import { InstructionFactory } from '../../instruction/factories/instruction-factory';
import { BinaryEncoder } from '../../library/binary-encoder/binary-encoder';
import { Instruction } from '../../instruction/instruction';
import Config from '../../library/config/config';

describe('Clock IV', () => {
    let cpu: CPU = null;
    let instruction: Instruction;
    let spy: jasmine.Spy;
    const encoder = new BinaryEncoder();

    beforeAll(() => {
        cpu = new CPU();
        instruction = InstructionFactory.fromSymbolic('add $1, $2, $3');
        spy = spyOnProperty(instruction, 'clocks').and.returnValue([new Clock4()]);
    });

    it('sets the CPU control signals', () => {
        cpu.register('$2').value = encoder.binary(5, Config.get().word_length);
        cpu.register('$3').value = encoder.binary(10, Config.get().word_length);

        cpu.simulate(instruction);
        cpu.nextClock();

        expect(spy).toHaveBeenCalled();
        expect(cpu.control.aluSelA).toBe('1');
        expect(cpu.control.aluSelB).toBe('00');
        expect(cpu.control.aluOp).toBe('10');
    });

    it('does operation between arguments in R-type instruction', () => {
        const operand1 = 20;
        const operand2 = 10;
        const result = 20 + 10;

        cpu.register('$2').value = encoder.binary(operand1, Config.get().word_length);
        cpu.register('$3').value = encoder.binary(operand2, Config.get().word_length);

        cpu.simulate(instruction);
        cpu.nextClock();

        expect(spy).toHaveBeenCalled();
        expect(cpu.alu.result).toBe(encoder.binary(result, Config.get().word_length));
    });
});
