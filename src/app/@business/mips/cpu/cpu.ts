import { ALU } from '../alu/alu';
import { Control } from '../control/control';
import { Memory } from '../memory/memory';

export class CPU
{
    protected _alu: ALU;
    protected _control: Control;
    protected _memory: Memory;

    public constructor ()
    {
        this._alu = new ALU();
        this._control = new Control();
        this._memory = new Memory();
    }

    public get alu ()
    {
        return this._alu;
    }

    public get control ()
    {
        return this._control;
    }

    public get memory ()
    {
        return this._memory;
    }
}
