import { Clock } from '../clock';
import { CPU } from '../../cpu/cpu';

export class Clock5  implements Clock
{
    public constructor ()
    {
        //
    }

    public id (): string
    {
        return 'clock_5';
    }

    public execute (cpu: CPU): void
    {
        this.setControl(cpu);
        this.doBranch(cpu);
    }

    protected setControl (cpu: CPU): void
    {
        cpu.control.aluSelA = '1';
        cpu.control.aluSelB = '00';
        cpu.control.aluOp = '01';
        cpu.control.pcWriteCond = '1';
        cpu.control.pcSource = '01';
    }

    protected doBranch (cpu: CPU): void
    {
        // First operand is 'rs' register.
        cpu.alu.op1 = cpu.register(cpu.instruction.rs).value;

        // Second operand is 'rt' register.
        cpu.alu.op2 = cpu.register(cpu.instruction.rt).value;

        // Tell the ALU to do subtraction.
        cpu.alu.op  = cpu.control.aluOp;
        cpu.alu.execute();

        // If instruction is 'be'.
        // If 'rs' == 'rt' jump to address calculated in 'Clock2'.
        // Jump is done by altering the value of 'PC' register.
        if (cpu.instruction.op === '000100' && cpu.alu.zero === '1') {
            cpu.register('$pc').value = cpu.register('$target').value;
        }

        // If instruction is 'bne'
        // If 'rs' != 'rt' jump to address calculated in 'Clock2'.
        // Jump is done by altering the value of 'PC' register.
        if (cpu.instruction.op === '000101' && cpu.alu.zero === '0') {
            cpu.register('$pc').value = cpu.register('$target').value;
        }
    }
}
