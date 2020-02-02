import { CPU } from './cpu';
import { InstructionFactory } from '../instruction/factories/instruction-factory';

describe('CPU', () => {
    let cpu: CPU = null;

    beforeAll(() => cpu = new CPU());

    it('properly initialises CPU when simulate method is called', () => {
        const instruction = InstructionFactory.fromSymbolic('add $a0, $v0, $v1');

        cpu.simulate(instruction);

        expect(
            cpu.memory.get(cpu.register('$pc').value)
        ).toBe(instruction.binary);
    });
});
