export class ALU
{
    protected _op1: string;
    protected _op2: string;

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
}
