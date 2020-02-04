import { CPU } from '../../cpu/cpu';
import { InstructionFactory } from '../../instruction/factories/instruction-factory';
import { ClockII } from './clock-II';

describe('Clock II', () => {
    let cpu: CPU = null;

    beforeAll(() => cpu = new CPU());

    it('sets the CPU control signals', () => {
        const instruction = InstructionFactory.fromSymbolic('add $1, $2, $3');
        spyOnProperty(instruction, 'clocks').and.returnValue([new ClockII()]);

        cpu.simulate(instruction);
        cpu.nextClock();

        expect(cpu.control.aluSelA).toBe('0');
        expect(cpu.control.aluSelB).toBe('11');
        expect(cpu.control.aluOp).toBe('00');
        expect(cpu.control.targetWrite).toBe('1');
    });
});
