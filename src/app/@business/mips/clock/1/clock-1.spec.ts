import { InstructionFactory } from '../../instruction/factories/instruction-factory';
import { CPU } from '../../cpu/cpu';
import { BinaryEncoder } from '../../library/binary-encoder/binary-encoder';
import { Clock1 } from './clock-1';
import Config from '../../library/config/config';

describe('Clock 1', () => {
    let cpu: CPU = null;
    const encoder: BinaryEncoder = new BinaryEncoder();

    beforeAll(() => cpu = new CPU());

    it('sets the CPU control signals', () => {
        const instruction = InstructionFactory.fromSymbolic('add $1, $2, $3');
        const spy = spyOnProperty(instruction, 'clocks').and.returnValue([new Clock1(Config.get().word_length)]);

        cpu.simulate(instruction);
        cpu.execute();

        expect(spy).toHaveBeenCalled();
        expect(cpu.control.memRead).toBe('1');
        expect(cpu.control.aluSelA).toBe('0');
        expect(cpu.control.lorD).toBe('0');
        expect(cpu.control.irWrite).toBe('1');
        expect(cpu.control.aluSelB).toBe('01');
        expect(cpu.control.aluOp).toBe('00');
        expect(cpu.control.pcWrite).toBe('1');
        expect(cpu.control.pcSource).toBe('00');
    });

    it('increments PC by 4', () => {
        const instruction = InstructionFactory.fromSymbolic('add $1, $2, $3');
        const spy = spyOnProperty(instruction, 'clocks').and.returnValue([new Clock1(Config.get().word_length)]);

        cpu.register('$pc').value = encoder.binary(0, Config.get().word_length);
        cpu.simulate(instruction);
        cpu.execute();

        expect(spy).toHaveBeenCalled();
        expect(cpu.register('$pc').value).toBe('00000000000000000000000000000100');
    });

    it('reads instruction', () => {
        const instruction = InstructionFactory.fromSymbolic('add $1, $2, $3');
        const spy = spyOnProperty(instruction, 'clocks').and.returnValue([new Clock1(Config.get().word_length)]);

        cpu.simulate(instruction);
        cpu.execute();

        expect(spy).toHaveBeenCalled();
        expect(cpu.register('$ir').value).toBe(instruction.binary);
    });
});
