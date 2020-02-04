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
    protected _targetWrite: string;
    protected _aluOp: string;
    protected _aluSelA: string;
    protected _aluSelB: string;
    protected _regWrite: string;
    protected _regDst: string;

    public constructor ()
    {
        this.reset();
    }

    public reset (): void
    {
        this._pcWrite = '0';
        this._pcWriteCond = '0';
        this._lorD = '0';
        this._memRead = '0';
        this._memWrite = '0';
        this._irWrite = '0';
        this._memToReg = '0';
        this._pcSource = '00';
        this._targetWrite = '0';
        this._aluOp = '00';
        this._aluSelA = '0';
        this._aluSelB = '00';
        this._regWrite = '0';
        this._regDst = '0';
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

    public set targetWrite (value: string)
    {
        this._targetWrite = value;
    }

    public get targetWrite ()
    {
        return this._targetWrite;
    }

    public set aluOp (value: string)
    {
        this._aluOp = value;
    }

    public get aluOp ()
    {
        return this._aluOp;
    }

    public set aluSelA (value: string)
    {
        this._aluSelA = value;
    }

    public get aluSelA ()
    {
        return this._aluSelA;
    }

    public set aluSelB (value: string)
    {
        this._aluSelB = value;
    }

    public get aluSelB ()
    {
        return this._aluSelB;
    }

    public set regWrite (value: string)
    {
        this._regWrite = value;
    }

    public get regWrite ()
    {
        return this._regWrite;
    }

    public set regDst (value: string)
    {
        this._regDst = value;
    }

    public get regDst ()
    {
        return this._regDst;
    }
}
