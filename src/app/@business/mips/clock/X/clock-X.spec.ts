import { CPU } from '../../cpu/cpu';
import { BinaryEncoder } from '../../library/binary-encoder/binary-encoder';
import { InstructionFactory } from '../../instruction/factories/instruction-factory';
import { ClockX } from './clock-X';
import { ClockIII } from '../III/clock-III';
import { ClockVII } from '../VII/clock-VII';
import config from '../../library/config';

describe('Clock X', () => {
    let cpu: CPU = null;
    const encoder = new BinaryEncoder();

    beforeAll(() => cpu = new CPU());

    it('sets the CPU control signals', () => {
        const instruction = InstructionFactory.fromSymbolic('lw $1, 128($2)');
        const spy = spyOnProperty(instruction, 'clocks').and.returnValue([new ClockX()]);

        cpu.simulate(instruction);
        cpu.nextClock();

        expect(spy).toHaveBeenCalled();
        expect(cpu.control.regDst).toBe('0');
        expect(cpu.control.regWrite).toBe('1');
        expect(cpu.control.memToReg).toBe('1');
    });

    it('writes data read from memory to specified register', () => {
        const instr = InstructionFactory.fromSymbolic('lw $1, 128($2)');
        const spy = spyOnProperty(instr, 'clocks').and.returnValue([new ClockIII(), new ClockVII(), new ClockX()]);
        const memoryAddress = encoder.binary(1000 + 128, config.word_length);
        const memoryData = encoder.binary(111, config.word_length);

        cpu.memory.set(memoryAddress, memoryData);
        cpu.register('$2').value = encoder.binary(1000, config.word_length);

        cpu.simulate(instr);
        cpu.execute();

        expect(spy).toHaveBeenCalled();
        expect(cpu.register('$1').value).toBe(memoryData);
    });
});
