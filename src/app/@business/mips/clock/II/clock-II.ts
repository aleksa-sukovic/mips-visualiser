import { Clock } from '../clock';
import { CPU } from '../../cpu/cpu';
import { BinaryEncoder } from '../../library/binary-encoder/binary-encoder';
import config from '../../library/config';

export class ClockII implements Clock
{
    protected _encoder: BinaryEncoder = new BinaryEncoder();

    public execute (cpu: CPU): void
    {
        this.setControl(cpu);
        this.calculateBranchAddress(cpu);
    }

    protected setControl (cpu: CPU): void
    {
        cpu.control.aluSelA = '0';
        cpu.control.aluSelB = '11';
        cpu.control.aluOp = '00';
        cpu.control.targetWrite = '1';
    }

    protected calculateBranchAddress (cpu: CPU): void
    {
        cpu.alu.op1 = cpu.register('$pc').value;
        cpu.alu.op2 = this._encoder.signPad(cpu.instruction.offset, config.word_length);
        cpu.alu.op = '00';
        cpu.alu.execute();
        cpu.register('$target').value = cpu.alu.result;
    }
}
