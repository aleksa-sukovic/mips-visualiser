import { InstructionFactory } from '../instruction/factories/instruction-factory';
import { Clock } from '../clock/clock';
import { Clock1 } from '../clock/1/clock-1';
import Config from '../library/config/config';
import { CPU } from './cpu';

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

    it('resets control unit after each clock', () => {
        class TestClock implements Clock
        {
            public id (): string { return ''; }
            public execute (aCpu: CPU): void
            {
                const defaultCPU = new CPU();

                expect(aCpu.control.pcWrite).toBe(defaultCPU.control.pcWrite);
                expect(aCpu.control.pcWriteCond).toBe(defaultCPU.control.pcWriteCond);
                expect(aCpu.control.lorD).toBe(defaultCPU.control.lorD);
                expect(aCpu.control.memRead).toBe(defaultCPU.control.memRead);
                expect(aCpu.control.memWrite).toBe(defaultCPU.control.memWrite);
                expect(aCpu.control.irWrite).toBe(defaultCPU.control.irWrite);
                expect(aCpu.control.memToReg).toBe(defaultCPU.control.memToReg);
                expect(aCpu.control.pcSource).toBe(defaultCPU.control.pcSource);
                expect(aCpu.control.targetWrite).toBe(defaultCPU.control.targetWrite);
                expect(aCpu.control.aluOp).toBe(defaultCPU.control.aluOp);
                expect(aCpu.control.aluSelA).toBe(defaultCPU.control.aluSelA);
                expect(aCpu.control.aluSelB).toBe(defaultCPU.control.aluSelB);
                expect(aCpu.control.regWrite).toBe(defaultCPU.control.regWrite);
                expect(aCpu.control.regDst).toBe(defaultCPU.control.regDst);
            }
        }

        const instruction = InstructionFactory.fromSymbolic('add $1, $2, $3');
        spyOnProperty(instruction, 'clocks')
            .and.returnValue([new Clock1(Config.get().word_length), new TestClock()]);

        cpu.simulate(instruction);
        cpu.nextClock();
    });
});
