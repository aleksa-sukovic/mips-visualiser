import { CPU } from '../../cpu/cpu';
import { BinaryEncoder } from '../../library/binary-encoder/binary-encoder';
import { InstructionFactory } from '../../instruction/factories/instruction-factory';
import { Clock6 } from './clock-6';
import Config from '../../library/config/config';

describe('Clock 6', () => {
    let cpu: CPU = null;
    const encoder = new BinaryEncoder();

    beforeAll(() => cpu = new CPU());

    it('sets the CPU control signals', () => {
        const instruction = InstructionFactory.fromSymbolic('j 1024');
        const spy = spyOnProperty(instruction, 'clocks').and.returnValue([new Clock6()]);

        cpu.simulate(instruction);
        cpu.nextClock();

        expect(spy).toHaveBeenCalled();
        expect(cpu.control.pcWrite).toBe('1');
        expect(cpu.control.pcSource).toBe('10');
    });

    it('sets the PC value to specified address', () => {
        const instruction = InstructionFactory.fromSymbolic('j 1024');
        const spy = spyOnProperty(instruction, 'clocks').and.returnValue([new Clock6()]);
        let finalPcValue = '';

        cpu.register('$pc').value = encoder.binary(1000, Config.get().word_length);
        cpu.simulate(instruction);
        cpu.nextClock();

        finalPcValue += cpu.register('$pc').value.substring(0, 4); // first 4 bits from current PC address
        finalPcValue += encoder.binary(1024, 26); // address specified in instruction
        finalPcValue += '00'; // shift 2 times (address is always multiple of 4)

        expect(spy).toHaveBeenCalled();
        expect(cpu.register('$pc').value).toBe(finalPcValue);
    });
});
