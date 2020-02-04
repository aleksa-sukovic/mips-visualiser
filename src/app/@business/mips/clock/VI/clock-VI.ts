import { Clock } from '../clock';
import { CPU } from '../../cpu/cpu';
import { BinaryEncoder } from '../../library/binary-encoder/binary-encoder';
import config from '../../library/config';

export class ClockVI  implements Clock
{
    protected _encoder: BinaryEncoder;

    public constructor ()
    {
        this._encoder = new BinaryEncoder();
    }

    public execute (cpu: CPU): void
    {
        this.setControl(cpu);
        this.jump(cpu);
    }

    protected setControl (cpu: CPU): void
    {
        cpu.control.pcWrite = '1';
        cpu.control.pcSource = '10';
    }

    protected jump (cpu: CPU): void
    {
        // Add higher 4 bits from current PC value.
        let pcValue = cpu.register('$pc').value.substring(0, 4);

        // Add 26 bit address specified in instruction.
        pcValue += cpu.instruction.address;

        // Shift left two times
        pcValue += '00';

        // Update PC register
        cpu.register('$pc').value = pcValue;
    }
}
