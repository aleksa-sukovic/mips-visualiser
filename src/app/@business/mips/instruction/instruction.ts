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
}
