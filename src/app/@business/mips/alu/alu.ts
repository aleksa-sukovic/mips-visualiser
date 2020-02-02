import { BinaryConverter } from '../library/binary-converter/binary-converter';

export class ALU
{
    protected _op: string;
    protected _funct: string;
    protected _result: string;
    protected _op1: string;
    protected _op2: string;
    protected _zero: string;
    protected _registerLength: number;
    protected _converter: BinaryConverter;

    public constructor ()
    {
        this._op1 = '0';
        this._op2 = '0';
        this._funct = '000000';
        this._op = '010';
        this._zero = '0';
        this._registerLength = 3;
        this._converter = new BinaryConverter();
    }

    public execute (): void
    {
        if (this.op === '00') {
            this.add();
        } else if (this.op.endsWith('1')) {
            this.subtract();
        } else if (this.op.startsWith('1')) {
            this.operationFromFunct();
        }

        this._zero = this._converter.number(this._result) === 0 ? '1' : '0';
    }

    private operationFromFunct (): void
    {
        if (this.funct.endsWith('0000')) {
            this.add();
        } else if (this.funct.endsWith('0010')) {
            this.subtract();
        } else if (this.funct.endsWith('0100')) {
            this.and();
        } else if (this.funct.endsWith('0101')) {
            this.or();
        } else if (this.funct.endsWith('1010')) {
            this.slt();
        }
    }

    private add (): void
    {
        const op1 = this._converter.number(this.op1);
        const op2 = this._converter.number(this.op2);
        this._result = this._converter.binary(op1 + op2, this._registerLength);
    }

    private subtract (): void
    {
        const op1 = this._converter.number(this.op1);
        const op2 = this._converter.number(this.op2);
        this._result = this._converter.binary(op1 - op2, this._registerLength);
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

    private or (): void
    {
        const length = this.op1.length;
        this._result = '';

        for (let i = length - 1; i >= 0; i--) {
            const bit = this.op1[i] === '1' || this.op2[i] === '1' ? '1' : '0';

            this._result = bit + this._result;
        }
    }

    private slt (): void
    {
        const op1 = this._converter.number(this.op1);
        const op2 = this._converter.number(this.op2);
        const result = op1 < op2 ? '1' : '0';

        this._result = this._converter.pad(result, this._registerLength);
    }

    public get op1 (): string
    {
        return this._op1;
    }

   public set op1 (value: string)
   {
       const pad = value.startsWith('1') ? '1' : '0';

       this._op1 = this._converter.pad(value, this._registerLength, pad);
   }

    public get op2 (): string
    {
        return this._op2;
    }

    public set op2 (value: string)
    {
        const pad = value.startsWith('1') ? '1' : '0';

        this._op2 = this._converter.pad(value, this._registerLength, pad);
    }

    public get op (): string
    {
        return this._op;
    }

    public set op (value: string)
    {
        this._op = value;
    }

    public get funct (): string
    {
        return this._funct;
    }

    public set funct (value: string)
    {
        this._funct = value;
    }

    public get zero ()
    {
        return this._zero;
    }

    public set registerLength (value: number)
    {
        this._registerLength = value;
    }

    public get result (): string
    {
        return this._result;
    }
}
