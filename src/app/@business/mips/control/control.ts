export class Control
{
    protected _pcWrite: string;
    protected _pcWriteCond: string;
    protected _lorD: string;

    public set pcWrite (value: string)
    {
        this._pcWrite = value;
    }

    public get pcWrite ()
    {
        return this._pcWrite;
    }

    public set pcWriteCond (value: string)
    {
        this._pcWriteCond = value;
    }

    public get pcWriteCond ()
    {
        return this._pcWriteCond;
    }

    public set lorD (value: string)
    {
        this._lorD = value;
    }

    public get lorD ()
    {
        return this._lorD;
    }
}
