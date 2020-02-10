import { CPU } from '../../cpu/cpu';
import { BinaryEncoder } from '../../library/binary-encoder/binary-encoder';
import { InstructionFactory } from '../../instruction/factories/instruction-factory';
import { Clock5 } from './clock-5';
import { Instruction } from '../../instruction/instruction';
import Config from '../../library/config/config';

describe('Clock 5', () => {
    let cpu: CPU = null;
    let instruction: Instruction = null;
    let spy: jasmine.Spy;
    const encoder = new BinaryEncoder();

    beforeAll(() => {
        cpu = new CPU();
        instruction = InstructionFactory.fromSymbolic('beq $1, $2, 128');
        spy = spyOnProperty(instruction, 'clocks').and.returnValue([new Clock5()]);
    });

    it('sets the CPU control signals', () => {
        cpu.simulate(instruction);
        cpu.nextClock();

        expect(spy).toHaveBeenCalled();
        expect(cpu.control.aluSelA).toBe('1');
        expect(cpu.control.aluSelB).toBe('00');
        expect(cpu.control.aluOp).toBe('01');
        expect(cpu.control.pcWriteCond).toBe('1');
        expect(cpu.control.pcSource).toBe('01');
    });

    it('updates PC value if branch should happen', () => {
        // Operands are equal, 'PC' will get updated with branch address stored in 'target' register.
        const operand1 = 10;
        const operand2 = 10;
        const branchAddress = 1234;
        const pcValue = 1000;

        cpu.register('$pc').value = encoder.binary(pcValue, Config.get().word_length);
        cpu.register('$target').value = encoder.binary(branchAddress, Config.get().word_length);
        cpu.register('$1').value = encoder.binary(operand1, Config.get().word_length);
        cpu.register('$2').value = encoder.binary(operand2, Config.get().word_length);

        cpu.simulate(instruction);
        cpu.nextClock();

        expect(spy).toHaveBeenCalled();
        expect(cpu.register('$pc').value).toBe(encoder.binary(branchAddress, Config.get().word_length));
    });

    it('does not update PC value if operands are not equal', () => {
        // Operands are not equal, 'PC' will not get updated.
        const operand1 = 10;
        const operand2 = 5;
        const pcValue = 2000;

        cpu.register('$1').value = encoder.binary(operand1, Config.get().word_length);
        cpu.register('$2').value = encoder.binary(operand2, Config.get().word_length);
        cpu.register('$pc').value = encoder.binary(pcValue, Config.get().word_length);

        cpu.simulate(instruction);
        cpu.nextClock();

        expect(spy).toHaveBeenCalled();
        expect(cpu.register('$pc').value).toBe(encoder.binary(pcValue, Config.get().word_length));
    });
});
