import { Clock } from '../clock';
import { CPU } from '../../cpu/cpu';
import { BinaryEncoder } from '../../library/binary-encoder/binary-encoder';
import config from '../../library/config';

export class ClockI implements Clock
{
    private _encoder: BinaryEncoder;

    public constructor ()
    {
        this._encoder = new BinaryEncoder();
    }

    public execute (cpu: CPU): void
    {
        this.setControl(cpu);
        this.readInstruction(cpu);
        this.incrementPC(cpu);
    }

    protected setControl (cpu: CPU): void
    {
        cpu.control.memRead  = '1';
        cpu.control.aluSelA  = '0';
        cpu.control.lorD     = '0';
        cpu.control.irWrite  = '1';
        cpu.control.aluSelB  = '01';
        cpu.control.aluOp    = '00';
        cpu.control.pcWrite  = '1';
        cpu.control.pcSource = '00';
    }

    protected readInstruction (cpu: CPU): void
    {
        cpu.register('$ir').value = cpu.instruction.binary;
    }

    protected incrementPC (cpu: CPU): void
    {
        cpu.alu.op1 = cpu.register('$pc').value;
        cpu.alu.op2 = this._encoder.binary(4, config.word_length);
        cpu.alu.op  = '00';
        cpu.alu.execute();
        cpu.register('$pc').value = cpu.alu.result;
    }
}
