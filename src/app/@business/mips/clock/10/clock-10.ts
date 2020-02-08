import { Clock } from '../clock';
import { CPU } from '../../cpu/cpu';
import { BinaryEncoder } from '../../library/binary-encoder/binary-encoder';

export class Clock10  implements Clock
{
    protected _encoder: BinaryEncoder;

    public constructor ()
    {
        this._encoder = new BinaryEncoder();
    }

    public id (): string
    {
        return 'clock_10';
    }

    public execute (cpu: CPU): void
    {
        this.setControl(cpu);
        this.writeToRegister(cpu);
    }

    protected setControl (cpu: CPU): void
    {
        cpu.control.regDst = '0';
        cpu.control.regWrite = '1';
        cpu.control.memToReg = '1';
    }

    protected writeToRegister (cpu: CPU): void
    {
        // Write data read from memory to 'rt' register.
        cpu.register(cpu.instruction.rt).value = cpu.register('$memData').value;
    }
}
