import { Clock } from '../clock';
import { CPU } from '../../cpu/cpu';
import { BinaryEncoder } from '../../library/binary-encoder/binary-encoder';

export class Clock8  implements Clock
{
    protected _encoder: BinaryEncoder;

    public constructor ()
    {
        this._encoder = new BinaryEncoder();
    }

    public id (): string
    {
        return 'clock_8';
    }

    public execute (cpu: CPU): void
    {
        this.setControl(cpu);
        this.write(cpu);
    }

    protected setControl (cpu: CPU): void
    {
        cpu.control.memWrite = '1';
        cpu.control.lorD = '1';
    }

    protected write (cpu: CPU): void
    {
        // Take the value of 'rt' register.
        const sourceRegister = cpu.register(cpu.instruction.rt);

        // Write to calculated address.
        cpu.memory.set(cpu.alu.result, sourceRegister.value);
    }
}
