export class Register
{
    protected _aliases: string[];
    protected _binary: string;
    protected _value: string;

    public constructor (aliases: string[], binary: string, value: string = '')
    {
        this._aliases = aliases;
        this._binary = binary;
        this._value = value;
    }

    public hasAlias (value: string): boolean
    {
        return this._aliases.find(it => it === value) !== undefined;
    }

    public get binary (): string
    {
        return this._binary;
    }

    public get value (): string
    {
        return this._value;
    }
}
