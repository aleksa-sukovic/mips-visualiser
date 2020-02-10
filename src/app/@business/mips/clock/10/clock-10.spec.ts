import { CPU } from '../../cpu/cpu';
import { BinaryEncoder } from '../../library/binary-encoder/binary-encoder';
import { InstructionFactory } from '../../instruction/factories/instruction-factory';
import { Clock10 } from './clock-10';
import { Clock3 } from '../3/clock-3';
import { Clock7 } from '../7/clock-7';
import Config from '../../library/config/config';

describe('Clock X', () => {
    let cpu: CPU = null;
    const encoder = new BinaryEncoder();

    beforeAll(() => cpu = new CPU());

    it('sets the CPU control signals', () => {
        const instruction = InstructionFactory.fromSymbolic('lw $1, 128($2)');
        const spy = spyOnProperty(instruction, 'clocks').and.returnValue([new Clock10()]);

        cpu.simulate(instruction);
        cpu.nextClock();

        expect(spy).toHaveBeenCalled();
        expect(cpu.control.regDst).toBe('0');
        expect(cpu.control.regWrite).toBe('1');
        expect(cpu.control.memToReg).toBe('1');
    });

    it('writes data read from memory to specified register', () => {
        const instr = InstructionFactory.fromSymbolic('lw $1, 128($2)');
        const spy = spyOnProperty(instr, 'clocks').and.returnValue([new Clock3(Config.get().word_length), new Clock7(), new Clock10()]);
        const memoryAddress = encoder.binary(1000 + 128, Config.get().word_length);
        const memoryData = encoder.binary(111, Config.get().word_length);

        cpu.memory.set(memoryAddress, memoryData);
        cpu.register('$2').value = encoder.binary(1000, Config.get().word_length);

        cpu.simulate(instr);
        cpu.execute();

        expect(spy).toHaveBeenCalled();
        expect(cpu.register('$1').value).toBe(memoryData);
    });
});
