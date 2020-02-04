import { Clock } from '../clock';
import { CPU } from '../../cpu/cpu';
import { BinaryEncoder } from '../../library/binary-encoder/binary-encoder';

export class Clock7  implements Clock
{
    protected _encoder: BinaryEncoder;

    public constructor ()
    {
        this._encoder = new BinaryEncoder();
    }

    public execute (cpu: CPU): void
    {
        this.setControl(cpu);
        this.readData(cpu);
    }

    protected setControl (cpu: CPU): void
    {
        cpu.control.memRead = '1';
        cpu.control.lorD = '1';
    }

    protected readData (cpu: CPU): void
    {
        // Read data from address calculated in 'Clock3' to 'memData' register.
        cpu.register('$memData').value = cpu.memory.get(cpu.alu.result);
    }
}
