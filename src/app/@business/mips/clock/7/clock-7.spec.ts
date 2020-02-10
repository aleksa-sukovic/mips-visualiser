import { CPU } from '../../cpu/cpu';
import { BinaryEncoder } from '../../library/binary-encoder/binary-encoder';
import { InstructionFactory } from '../../instruction/factories/instruction-factory';
import { Clock7 } from './clock-7';
import { Clock3 } from '../3/clock-3';
import Config from '../../library/config/config';

describe('Clock 7', () => {
    let cpu: CPU = null;
    const encoder = new BinaryEncoder();

    beforeAll(() => cpu = new CPU());

    it('sets the CPU control signals', () => {
        const instruction = InstructionFactory.fromSymbolic('lw $1, 128($2)');
        const spy = spyOnProperty(instruction, 'clocks').and.returnValue([new Clock7()]);

        cpu.simulate(instruction);
        cpu.nextClock();

        expect(spy).toHaveBeenCalled();
        expect(cpu.control.memRead).toBe('1');
        expect(cpu.control.lorD).toBe('1');
    });

    it('reads data from calculated offset', () => {
        const instruction = InstructionFactory.fromSymbolic('lw $1, 128($2)');
        const spy = spyOnProperty(instruction, 'clocks').and.returnValue([new Clock3(Config.get().word_length), new Clock7()]);
        const memoryAddress = encoder.binary(128 + 1000, Config.get().word_length);
        const memoryData = encoder.binary(111, Config.get().word_length);

        cpu.register('$2').value = encoder.binary(1000, Config.get().word_length);
        cpu.memory.set(memoryAddress, memoryData);

        cpu.simulate(instruction);
        cpu.execute();

        expect(spy).toHaveBeenCalled();
        expect(cpu.register('$memData').value).toBe(memoryData);
    });
});
