import { CPU } from '../../cpu/cpu';
import { BinaryEncoder } from '../../library/binary-encoder/binary-encoder';
import { InstructionFactory } from '../../instruction/factories/instruction-factory';
import { ClockV } from './clock-V';
import config from '../../library/config';
import { Instruction } from '../../instruction/instruction';

describe('Clock V', () => {
    let cpu: CPU = null;
    let instruction: Instruction = null;
    let spy: jasmine.Spy;
    const encoder = new BinaryEncoder();

    beforeAll(() => {
        cpu = new CPU();
        instruction = InstructionFactory.fromSymbolic('add $1, $2, $3');
        spy = spyOnProperty(instruction, 'clocks').and.returnValue([new ClockV()]);
    });

    it('sets the CPU control signals', () => {
        cpu.simulate(instruction);
        cpu.nextClock();

        expect(cpu.control.aluSelA).toBe('1');
        expect(cpu.control.aluSelB).toBe('00');
        expect(cpu.control.aluOp).toBe('01');
        expect(cpu.control.pcWriteCond).toBe('1');
        expect(cpu.control.pcSource).toBe('01');
    });

    it('updates PC value if branch should happen', () => {
        cpu.register('$pc').value = encoder.binary(1000, config.word_length);
        cpu.register('$target').value = encoder.binary(1000 + 256, config.word_length);
        cpu.register('$2').value = encoder.binary(10, config.word_length);
        cpu.register('$3').value = encoder.binary(10, config.word_length);

        cpu.simulate(instruction);
        cpu.nextClock();

        expect(spy).toHaveBeenCalled();
        expect(cpu.register('$pc').value).toBe(encoder.binary(1000 + 256, config.word_length));
    });

    it('does not update PC value if operands are not equal', () => {
        cpu.register('$pc').value = encoder.binary(1000, config.word_length);
        cpu.register('$2').value = encoder.binary(10, config.word_length);
        cpu.register('$3').value = encoder.binary(5, config.word_length);

        cpu.simulate(instruction);
        cpu.nextClock();

        expect(spy).toHaveBeenCalled();
        expect(cpu.register('$pc').value).toBe(encoder.binary(1000, config.word_length));
    });
});
