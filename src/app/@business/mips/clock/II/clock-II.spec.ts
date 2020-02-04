import { CPU } from '../../cpu/cpu';
import { InstructionFactory } from '../../instruction/factories/instruction-factory';
import { ClockII } from './clock-II';
import { ClockI } from '../I/clock-I';
import { BinaryEncoder } from '../../library/binary-encoder/binary-encoder';
import config from '../../library/config';

describe('Clock II', () => {
    let cpu: CPU = null;
    const encoder = new BinaryEncoder();

    beforeAll(() => cpu = new CPU());

    it('sets the CPU control signals', () => {
        const instruction = InstructionFactory.fromSymbolic('add $1, $2, $3');
        spyOnProperty(instruction, 'clocks').and.returnValue([new ClockII()]);

        cpu.simulate(instruction);
        cpu.nextClock();

        expect(cpu.control.aluSelA).toBe('0');
        expect(cpu.control.aluSelB).toBe('11');
        expect(cpu.control.aluOp).toBe('00');
        expect(cpu.control.targetWrite).toBe('1');
    });

    fit('calculates branch target address', () => {
        const instr = InstructionFactory.fromSymbolic('beq $1, $2, 128');
        spyOnProperty(instr, 'clocks').and.returnValue([new ClockI(), new ClockII()]);

        cpu.register('$pc').value = encoder.binary(1000, config.word_length);
        cpu.simulate(instr);
        cpu.nextClock();
        cpu.nextClock();

        expect(cpu.register('$target').value).toBe(encoder.binary(1132, config.word_length));
    });
});
