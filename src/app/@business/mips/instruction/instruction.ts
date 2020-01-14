export class Instruction
{
    protected _binary: string;

    public constructor (binary: string)
    {
        this.binary = binary;
    }

    public set binary (value: string)
    {
        this._binary = value;
    }
}
