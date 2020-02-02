export class ALU
{
    protected _operation: string;
    protected _result: string;
    protected _op1: string;
    protected _op2: string;

    public constructor ()
    {
        this._op1 = '0';
        this._op2 = '0';
        this._operation = '010';
    }

    public execute (): string
    {
        switch (this.operation) {
            case '000':
                break;
            case '001':
                break;
            case '010':
                break;
            case '110':
                break;
            case '111':
                break;
            default:
                //
        }
    }

    public get op1 (): string
    {
        return this._op1;
    }

   public set op1 (value: string)
   {
       this._op1 = value;
   }

    public get op2 (): string
    {
        return this._op2;
    }

    public set op2 (value: string)
    {
        this._op2 = value;
    }

    public get operation (): string
    {
        return this._operation;
    }

    public set operation (value: string)
    {
        this._operation = value;
    }

    public get result (): string
    {
        return this._result;
    }
}
