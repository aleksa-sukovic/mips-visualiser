export class Control
{
    protected _pcWrite: string;
    protected _pcWriteCond: string;
    protected _lorD: string;
    protected _memRead: string;
    protected _memWrite: string;
    protected _irWrite: string;
    protected _memToReg: string;
    protected _pcSource: string;

    public constructor ()
    {
        this._pcWrite = '0';
        this._pcWriteCond = '0';
        this._lorD = '0';
        this._memRead = '0';
        this._memWrite = '0';
        this._irWrite = '0';
        this._memToReg = '0';
        this._pcSource = '00';
    }

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

    public set memRead (value: string)
    {
        this._memRead = value;
    }

    public get memRead ()
    {
        return this._memRead;
    }

    public set memWrite (value: string)
    {
        this._memWrite = value;
    }

    public get memWrite ()
    {
        return this._memWrite;
    }

    public set irWrite (value: string)
    {
        this._irWrite = value;
    }

    public get irWrite ()
    {
        return this._irWrite;
    }

    public set memToReg (value: string)
    {
        this._memToReg = value;
    }

    public get memToReg ()
    {
        return this._memToReg;
    }

    public set pcSource (value: string)
    {
        this._pcSource = value;
    }

    public get pcSource ()
    {
        return this._pcSource;
    }
}
