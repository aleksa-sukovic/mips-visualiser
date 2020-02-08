import { Clock } from '../clock';
import { CPU } from '../../cpu/cpu';

export class Clock4  implements Clock
{
    public constructor ()
    {
        //
    }

    public id (): string
    {
        return 'clock_4';
    }

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
        // Set the ALU operands to be registers 'rs' and 'rt'
        cpu.alu.op1 = cpu.register(cpu.instruction.rs).value;
        cpu.alu.op2 = cpu.register(cpu.instruction.rt).value;

        // Set the ALU funct input to be 'funct' field from instruction.
        cpu.alu.funct = cpu.instruction.funct;

        // Set the ALU operation so it uses 'funct'.
        cpu.alu.op = cpu.control.aluOp;

        cpu.alu.execute();
    }
}
