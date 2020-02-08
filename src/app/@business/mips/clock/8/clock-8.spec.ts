import { CPU } from '../../cpu/cpu';
import { BinaryEncoder } from '../../library/binary-encoder/binary-encoder';
import { InstructionFactory } from '../../instruction/factories/instruction-factory';
import { Clock8 } from './clock-8';
import config from '../../library/config';
import { Clock3 } from '../3/clock-3';

describe('Clock 8', () => {
    let cpu: CPU = null;
    const encoder = new BinaryEncoder();

    beforeAll(() => cpu = new CPU());

    it('sets the CPU control signals', () => {
        const instruction = InstructionFactory.fromSymbolic('lw $1, 128($2)');
        const spy = spyOnProperty(instruction, 'clocks').and.returnValue([new Clock8()]);

        cpu.simulate(instruction);
        cpu.nextClock();

        expect(spy).toHaveBeenCalled();
        expect(cpu.control.memWrite).toBe('1');
        expect(cpu.control.lorD).toBe('1');
    });

    it('writes data to calculated address', () => {
        const instr = InstructionFactory.fromSymbolic('sw $1, 128($2)');
        const spy = spyOnProperty(instr, 'clocks').and.returnValue([new Clock3(config.word_length), new Clock8()]);
        const writeAddress = encoder.binary(1000 + 128, config.word_length);
        const writeValue = encoder.binary(111, config.word_length);

        cpu.register('$1').value = writeValue;
        cpu.register('$2').value = encoder.binary(1000, config.word_length);

        cpu.simulate(instr);
        cpu.execute();

        expect(spy).toHaveBeenCalled();
        expect(cpu.memory.get(writeAddress)).toBe(writeValue);
    });
});
