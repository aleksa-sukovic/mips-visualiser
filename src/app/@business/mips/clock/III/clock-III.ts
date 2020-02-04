import { Clock } from '../clock';
import { CPU } from '../../cpu/cpu';
import { BinaryEncoder } from '../../library/binary-encoder/binary-encoder';
import config from '../../library/config';

export class ClockIII implements Clock
{
    protected _encoder: BinaryEncoder;

    public constructor ()
    {
        this._encoder = new BinaryEncoder();
    }

    public execute (cpu: CPU): void
    {
        this.setControl(cpu);
        this.calculateMemoryAddress(cpu);
    }

    public setControl (cpu: CPU): void
    {
        cpu.control.aluSelA = '1';
        cpu.control.aluSelB = '10';
        cpu.control.aluOp = '00';
    }

    public calculateMemoryAddress (cpu: CPU): void
    {
        cpu.alu.op1 = cpu.register(cpu.instruction.rs).value;
        cpu.alu.op2 = this._encoder.signPad(cpu.instruction.offset, config.word_length);
        cpu.alu.op = cpu.control.aluOp;
        cpu.alu.execute();
    }
}
