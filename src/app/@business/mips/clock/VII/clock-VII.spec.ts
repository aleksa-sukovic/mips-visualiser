import { CPU } from '../../cpu/cpu';
import { BinaryEncoder } from '../../library/binary-encoder/binary-encoder';
import { InstructionFactory } from '../../instruction/factories/instruction-factory';
import { ClockVII } from './clock-VII';
import config from '../../library/config';
import { ClockIII } from '../III/clock-III';

describe('Clock VII', () => {
    let cpu: CPU = null;
    const encoder = new BinaryEncoder();

    beforeAll(() => cpu = new CPU());

    it('sets the CPU control signals', () => {
        const instruction = InstructionFactory.fromSymbolic('lw $1, 128($2)');
        const spy = spyOnProperty(instruction, 'clocks').and.returnValue([new ClockVII()]);

        cpu.simulate(instruction);
        cpu.nextClock();

        expect(spy).toHaveBeenCalled();
        expect(cpu.control.memRead).toBe('1');
        expect(cpu.control.lorD).toBe('1');
    });

    fit('reads data from calculated offset', () => {
        const instruction = InstructionFactory.fromSymbolic('lw $1, 128($2)');
        const spy = spyOnProperty(instruction, 'clocks').and.returnValue([new ClockIII(), new ClockVII()]);
        const memoryAddress = encoder.binary(128 + 1000, config.word_length);
        const memoryData = encoder.binary(111, config.word_length);

        cpu.register('$2').value = encoder.binary(1000, config.word_length);
        cpu.memory.set(memoryAddress, memoryData);

        cpu.simulate(instruction);
        cpu.execute();

        expect(spy).toHaveBeenCalled();
        expect(cpu.register('$memData').value).toBe(memoryData);
    });
});
