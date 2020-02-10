import { CPU } from '../../cpu/cpu';
import { InstructionFactory } from '../../instruction/factories/instruction-factory';
import { Clock2 } from './clock-2';
import { Clock1 } from '../1/clock-1';
import { BinaryEncoder } from '../../library/binary-encoder/binary-encoder';
import Config from '../../library/config/config';

describe('Clock 2', () => {
    let cpu: CPU = null;
    const encoder = new BinaryEncoder();

    beforeAll(() => cpu = new CPU());

    it('sets the CPU control signals', () => {
        const instruction = InstructionFactory.fromSymbolic('add $1, $2, $3');
        const spy = spyOnProperty(instruction, 'clocks').and.returnValue([new Clock2(Config.get().word_length)]);

        cpu.simulate(instruction);
        cpu.execute();

        expect(spy).toHaveBeenCalled();
        expect(cpu.control.aluSelA).toBe('0');
        expect(cpu.control.aluSelB).toBe('11');
        expect(cpu.control.aluOp).toBe('00');
        expect(cpu.control.targetWrite).toBe('1');
    });

    it('calculates branch target address', () => {
        const instr = InstructionFactory.fromSymbolic('beq $1, $2, 128');
        const spy = spyOnProperty(instr, 'clocks').and.returnValue([new Clock1(Config.get().word_length), new Clock2(Config.get().word_length)]);

        const offset = 128;
        const pcValue = 1000;

        // PC is incremented by '4' in 'Clock1'.
        const branchAddress = pcValue + 4 + offset;

        cpu.register('$pc').value = encoder.binary(pcValue, Config.get().word_length);
        cpu.simulate(instr);
        cpu.nextClock();
        cpu.nextClock();

        expect(spy).toHaveBeenCalled();
        expect(cpu.register('$target').value).toBe(encoder.binary(branchAddress, Config.get().word_length));
    });
});
