export class Register
{
    protected _aliases: string[];
    protected _binary: string;

    public constructor (aliases: string[], binary: string)
    {
        this._aliases = aliases;
        this._binary = binary;
    }

    public hasAlias (value: string): boolean
    {
        return this._aliases.find(it => it === value) !== undefined;
    }

    public get binary (): string
    {
        return this._binary;
    }
}
