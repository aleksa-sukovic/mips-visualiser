import { Clock } from '../clock';
import { CPU } from '../../cpu/cpu';
import { BinaryEncoder } from '../../library/binary-encoder/binary-encoder';

export class Clock3 implements Clock
{
    protected _encoder: BinaryEncoder;

    public constructor (private wordLength: number)
    {
        this._encoder = new BinaryEncoder();
    }

    public id (): string
    {
        return 'clock_3';
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
        // First ALU operand is base register 'rs' specified by instruction.
        cpu.alu.op1 = cpu.register(cpu.instruction.rs).value;

        // Second ALU operand is sign-extended 16-bit offset read from instruction.
        cpu.alu.op2 = this._encoder.signPad(cpu.instruction.offset, this.wordLength);

        // Tell the ALU to do addition.
        cpu.alu.op = cpu.control.aluOp;
        cpu.alu.execute();
    }
}
