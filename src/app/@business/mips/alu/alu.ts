import { BinaryConverter } from '../library/binary-converter/binary-converter';

export class ALU
{
    protected _operation: string;
    protected _funct: string;
    protected _result: string;
    protected _op1: string;
    protected _op2: string;
    protected _converter: BinaryConverter;

    public constructor ()
    {
        this._op1 = '0';
        this._op2 = '0';
        this._funct = '000000';
        this._operation = '010';
        this._converter = new BinaryConverter();
    }

    public execute (): void
    {
        if (this.operation === '00') {
            this.add();
        } else if (this.operation.endsWith('1')) {
            this.subtract();
        } else if (this.operation.startsWith('1')) {
            this.operationFromFunct();
        }
    }

    private operationFromFunct (): void
    {
        if (this.funct.endsWith('0000')) {
            this.add();
        } else if (this.funct.endsWith('0010')) {
            this.subtract();
        } else if (this.funct.endsWith('0100')) {
            this.and();
        }
    }

    private add (): void
    {
        const op1 = this._converter.number(this.op1);
        const op2 = this._converter.number(this.op2);
        this._result = this._converter.binary(op1 + op2, this.op1.length);
    }

    private subtract (): void
    {
        const op1 = this._converter.number(this.op1);
        const op2 = this._converter.number(this.op2);
        this._result = this._converter.binary(op1 - op2, this.op1.length);
    }

    private and (): void
    {
        const length = this.op1.length;
        this._result = '';

        for (let i = length - 1; i >= 0; i--) {
            const bit = this.op1[i] === '1' && this.op2[i] === '1' ? '1' : '0';

            this._result = bit + this._result;
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

    public get funct (): string
    {
        return this._funct;
    }

    public set funct (value: string)
    {
        this._funct = value;
    }

    public get result (): string
    {
        return this._result;
    }
}
