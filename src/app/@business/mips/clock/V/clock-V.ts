import { Clock } from '../clock';
import { CPU } from '../../cpu/cpu';

export class ClockV  implements Clock
{
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
        cpu.alu.op1 = cpu.register(cpu.instruction.rs).value;
        cpu.alu.op2 = cpu.register(cpu.instruction.rt).value;
        cpu.alu.op  = cpu.control.aluOp;
        cpu.alu.execute();

        if (cpu.alu.zero === '1') {
            cpu.register('$pc').value = cpu.register('$target').value;
        }
    }
}
