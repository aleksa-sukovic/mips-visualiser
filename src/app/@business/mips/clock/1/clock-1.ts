import { Clock } from '../clock';
import { CPU } from '../../cpu/cpu';
import { BinaryEncoder } from '../../library/binary-encoder/binary-encoder';

export class Clock1 implements Clock
{
    private _encoder: BinaryEncoder;

    public constructor (private wordLength: number)
    {
        this._encoder = new BinaryEncoder();
    }

    public id (): string
    {
        return 'clock_1';
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
        // First ALU operand is current 'PC (program counter)' value.
        cpu.alu.op1 = cpu.register('$pc').value;

        // Second ALU operand is number '4'
        // We are incrementing 'PC' to point to next instruction.
        cpu.alu.op2 = this._encoder.binary(4, this.wordLength);

        // Tell the ALU to do addition.
        cpu.alu.op  = '00';
        cpu.alu.execute();

        // Write to 'PC' register (PC <- PC + 4).
        cpu.register('$pc').value = cpu.alu.result;
    }
}
