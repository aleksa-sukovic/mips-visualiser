import { CPU } from '../../cpu/cpu';
import { BinaryEncoder } from '../../library/binary-encoder/binary-encoder';
import { InstructionFactory } from '../../instruction/factories/instruction-factory';
import { Clock9 } from './clock-9';
import { Clock4 } from '../4/clock-4';
import Config from '../../library/config/config';

describe('Clock 9', () => {
    let cpu: CPU = null;
    const encoder = new BinaryEncoder();

    beforeAll(() => cpu = new CPU());

    it('sets the CPU control signals', () => {
        const instruction = InstructionFactory.fromSymbolic('lw $1, 128($2)');
        const spy = spyOnProperty(instruction, 'clocks').and.returnValue([new Clock9()]);

        cpu.simulate(instruction);
        cpu.nextClock();

        expect(spy).toHaveBeenCalled();
        expect(cpu.control.regDst).toBe('1');
        expect(cpu.control.regWrite).toBe('1');
        expect(cpu.control.memToReg).toBe('0');
    });

    it('writes data to specified register', () => {
        const instr = InstructionFactory.fromSymbolic('add $1, $2, $3');
        const spy = spyOnProperty(instr, 'clocks').and.returnValue([new Clock4(), new Clock9()]);
        const $2 = encoder.binary(100, Config.get().word_length);
        const $3 = encoder.binary(200, Config.get().word_length);
        const $1 = encoder.binary(100 + 200, Config.get().word_length);

        cpu.register('$2').value = $2;
        cpu.register('$3').value = $3;
        cpu.simulate(instr);
        cpu.execute();

        expect(spy).toHaveBeenCalled();
        expect(cpu.register('$1').value).toBe($1);
    });
});
