import { Clock } from '../clock';
import { CPU } from '../../cpu/cpu';

export class ClockIV  implements Clock
{
    public execute (cpu: CPU): void
    {
        this.setControl(cpu);
        this.doOperation(cpu);
    }

    protected setControl (cpu: CPU): void
    {
        cpu.control.aluSelA = '1';
        cpu.control.aluSelB = '00';
        cpu.control.aluOp = '10';
    }

    protected doOperation (cpu: CPU): void
    {
        cpu.alu.op1 = cpu.register(cpu.instruction.rs).value;
        cpu.alu.op2 = cpu.register(cpu.instruction.rt).value;
        cpu.alu.funct = cpu.instruction.funct;
        cpu.alu.op = cpu.control.aluOp;

        cpu.alu.execute();
        cpu.register(cpu.instruction.rd).value = cpu.alu.result;
    }
}
