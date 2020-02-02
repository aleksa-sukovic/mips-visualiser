export class Control
{
    protected _pcWrite: string;
    protected _pcWriteCond: string;
    protected _lorD: string;
    protected _memRead: string;
    protected _memWrite: string;
    protected _irRegister: string;
    protected _memToReg: string;

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

    public set irRegister (value: string)
    {
        this._irRegister = value;
    }

    public get irRegister ()
    {
        return this._irRegister;
    }

    public set memToReg (value: string)
    {
        this._memToReg = value;
    }

    public get memToReg ()
    {
        return this._memToReg;
    }
}
