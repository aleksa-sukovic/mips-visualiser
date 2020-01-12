export class Instruction
{
    protected _alias: string;
    protected _opcode: string;

    public constructor (alias: string, opcode: string)
    {
        this._alias = alias;
        this._opcode = opcode;
    }

    public get alias (): string
    {
        return this._alias;
    }

    public get opcode (): string
    {
        return this._opcode;
    }
}
