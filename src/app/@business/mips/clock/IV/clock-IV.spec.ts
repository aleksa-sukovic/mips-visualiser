import { CPU } from '../../cpu/cpu';
import { ClockIV } from './clock-IV';
import { InstructionFactory } from '../../instruction/factories/instruction-factory';
import { BinaryEncoder } from '../../library/binary-encoder/binary-encoder';
import config from '../../library/config';

describe('Clock IV', () => {
    let cpu: CPU = null;
    const encoder = new BinaryEncoder();

    beforeAll(() => cpu = new CPU());

    it('sets the CPU control signals', () => {
        const instruction = InstructionFactory.fromSymbolic('add $1, $2, $3');
        spyOnProperty(instruction, 'clocks').and.returnValue([new ClockIV()]);

        cpu.register('$2').value = encoder.binary(5, config.word_length);
        cpu.register('$3').value = encoder.binary(10, config.word_length);
        cpu.simulate(instruction);
        cpu.nextClock();

        expect(cpu.control.aluSelA).toBe('1');
        expect(cpu.control.aluSelB).toBe('00');
        expect(cpu.control.aluOp).toBe('10');
    });

    it('does operation between arguments in R-type instruction', () => {
        const instruction = InstructionFactory.fromSymbolic('add $1, $2, $3');
        const spy = spyOnProperty(instruction, 'clocks').and.returnValue([new ClockIV()]);

        cpu.register('$2').value = encoder.binary(5, config.word_length);
        cpu.register('$3').value = encoder.binary(10, config.word_length);
        cpu.simulate(instruction);
        cpu.nextClock();

        expect(spy).toHaveBeenCalled();
        expect(cpu.register('$1').value).toBe(encoder.binary(15, config.word_length));
    });
});
