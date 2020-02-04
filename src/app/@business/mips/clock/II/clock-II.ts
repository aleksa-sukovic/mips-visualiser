import { Clock } from '../clock';
import { CPU } from '../../cpu/cpu';

export class ClockII implements Clock
{
    public execute (cpu: CPU): void
    {
        this.setControl(cpu);
    }

    protected setControl (cpu: CPU): void
    {
        cpu.control.aluSelA = '0';
        cpu.control.aluSelB = '11';
        cpu.control.aluOp = '00';
        cpu.control.targetWrite = '1';
    }
}
