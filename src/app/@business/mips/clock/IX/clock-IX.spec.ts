import { CPU } from '../../cpu/cpu';
import { BinaryEncoder } from '../../library/binary-encoder/binary-encoder';
import { InstructionFactory } from '../../instruction/factories/instruction-factory';
import { ClockIX } from './clock-IX';
import { ClockIV } from '../IV/clock-IV';
import config from '../../library/config';

describe('Clock IV', () => {
    let cpu: CPU = null;
    const encoder = new BinaryEncoder();

    beforeAll(() => cpu = new CPU());

    it('sets the CPU control signals', () => {
        const instruction = InstructionFactory.fromSymbolic('lw $1, 128($2)');
        const spy = spyOnProperty(instruction, 'clocks').and.returnValue([new ClockIX()]);

        cpu.simulate(instruction);
        cpu.nextClock();

        expect(spy).toHaveBeenCalled();
        expect(cpu.control.regDst).toBe('1');
        expect(cpu.control.regWrite).toBe('1');
        expect(cpu.control.memToReg).toBe('0');
    });

    it('writes data to specified register', () => {
        const instr = InstructionFactory.fromSymbolic('add $1, $2, $3');
        const spy = spyOnProperty(instr, 'clocks').and.returnValue([new ClockIV(), new ClockIX()]);
        const $2 = encoder.binary(100, config.word_length);
        const $3 = encoder.binary(200, config.word_length);
        const $1 = encoder.binary(100 + 200, config.word_length);

        cpu.register('$2').value = $2;
        cpu.register('$3').value = $3;
        cpu.simulate(instr);
        cpu.execute();

        expect(spy).toHaveBeenCalled();
        expect(cpu.register('$1').value).toBe($1);
    });
});
