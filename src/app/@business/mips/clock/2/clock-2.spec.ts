import { CPU } from '../../cpu/cpu';
import { InstructionFactory } from '../../instruction/factories/instruction-factory';
import { Clock2 } from './clock-2';
import { Clock1 } from '../1/clock-1';
import { BinaryEncoder } from '../../library/binary-encoder/binary-encoder';
import config from '../../library/config';

describe('Clock 2', () => {
    let cpu: CPU = null;
    const encoder = new BinaryEncoder();

    beforeAll(() => cpu = new CPU());

    it('sets the CPU control signals', () => {
        const instruction = InstructionFactory.fromSymbolic('add $1, $2, $3');
        spyOnProperty(instruction, 'clocks').and.returnValue([new Clock2()]);

        cpu.simulate(instruction);
        cpu.nextClock();

        expect(cpu.control.aluSelA).toBe('0');
        expect(cpu.control.aluSelB).toBe('11');
        expect(cpu.control.aluOp).toBe('00');
        expect(cpu.control.targetWrite).toBe('1');
    });

    it('calculates branch target address', () => {
        const instr = InstructionFactory.fromSymbolic('beq $1, $2, 128');
        spyOnProperty(instr, 'clocks').and.returnValue([new Clock1(), new Clock2()]);

        cpu.register('$pc').value = encoder.binary(1000, config.word_length);
        cpu.simulate(instr);
        cpu.nextClock();
        cpu.nextClock();

        expect(cpu.register('$target').value).toBe(encoder.binary(1132, config.word_length));
    });
});
