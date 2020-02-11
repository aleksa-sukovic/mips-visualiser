import { Clock } from '../clock/clock';

export class Instruction
{
    protected _binary: string;
    protected _symbolic: string;
    protected _type: string;
    protected _clocks: Clock[];

    public constructor (binary: string, clocks: Clock[])
    {
        this.binary = binary;
        this._clocks = clocks;
    }

    public get clocks (): Clock[]
    {
        return this._clocks;
    }

    public set clocks (value: Clock[])
    {
        this._clocks = value;
    }

    public set binary (value: string)
    {
        this._binary = value;
    }

    public get binary ()
    {
        return this._binary;
    }

    public set symbolic (value: string)
    {
        this._symbolic = value;
    }

    public get symbolic ()
    {
        return this._symbolic;
    }

    public set type (value: string)
    {
        this._type = value;
    }

    public get type ()
    {
        return this._type;
    }

    public get op (): string
    {
        return this._binary.substring(0, 6);
    }

    public get rs (): string
    {
        return this._binary.substring(6, 11);
    }

    public get rt (): string
    {
        return this._binary.substring(11, 16);
    }

    public get rd (): string
    {
        return this._binary.substring(16, 21);
    }

    public get shamt (): string
    {
        return this._binary.substring(21, 26);
    }

    public get funct (): string
    {
        return this._binary.substring(26, 32);
    }

    public get offset (): string
    {
        return this._binary.substring(16, 32);
    }

    public get address (): string
    {
        return this._binary.substring(6, 32);
    }
}
