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

    public get op (): string
    {
        return this._binary.substr(0, 6);
    }
}
