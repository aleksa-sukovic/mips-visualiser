import { Clock } from '../clock';
import { CPU } from '../../cpu/cpu';
import { BinaryEncoder } from '../../library/binary-encoder/binary-encoder';

export class Clock9  implements Clock
{
    protected _encoder: BinaryEncoder;

    public constructor ()
    {
        this._encoder = new BinaryEncoder();
    }

    public id (): string
    {
        return 'clock_9';
    }

    public execute (cpu: CPU): void
    {
        this.setControl(cpu);
        this.writeToRegister(cpu);
    }

    protected setControl (cpu: CPU): void
    {
        cpu.control.regDst = '1';
        cpu.control.regWrite = '1';
        cpu.control.memToReg = '0';
    }

    protected writeToRegister (cpu: CPU): void
    {
        // Determine write register, different for 'R' and 'I' type instructions
        const destination = cpu.instruction.type === 'R' ?
            cpu.instruction.rd : cpu.instruction.rt;

        // Writes ALU result to destination register.
        cpu.register(destination).value = cpu.alu.result;
    }
}
