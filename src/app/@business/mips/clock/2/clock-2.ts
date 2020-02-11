import { Clock } from '../clock';
import { CPU } from '../../cpu/cpu';
import { BinaryEncoder } from '../../library/binary-encoder/binary-encoder';

export class Clock2 implements Clock
{
    protected _encoder: BinaryEncoder;

    public constructor (private wordLength: number)
    {
        this._encoder = new BinaryEncoder();
    }

    public id (): string
    {
        return 'clock_2';
    }

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
        // First ALU operand is current 'PC' value.
        cpu.alu.op1 = cpu.register('$pc').value;

        // Second ALU operand is sign-extended 16-bit offset from instruction.
        cpu.alu.op2 = this._encoder.signPad(cpu.instruction.offset, this.wordLength);

        // Tell the ALU to do addition.
        cpu.alu.op = '00';
        cpu.alu.execute();

        // Write the ALU result to 'target' register.
        cpu.register('$target').value = cpu.alu.result;
    }
}
