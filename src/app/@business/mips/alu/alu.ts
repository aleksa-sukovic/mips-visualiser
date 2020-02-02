import {BinaryConverter} from "../library/binary-converter/binary-converter";

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

    public execute (): string
    {
        if (this.operation === '00') {
            this.add();
        } else if (this.operation.endsWith('1')) {
            // SUB
        } else if (this.operation.startsWith('1')) {
            return this.operationFromFunct();
        }
    }

    private add (): void
    {
        const op1 = this._converter.number(this.op1);
        const op2 = this._converter.number(this.op2);
        this._result = this._converter.binary(op1 + op2);
    }

    private operationFromFunct (): string
    {
        switch (this.operation) {
            case '000': // AND
                return '';
            case '001': // OR
                return '';
            case '010': // ADD
                return '';
            case '110': // SUBTRACT
                return '';
            case '111': // SET ON LESS THAN
                return '';
            default:
                return '';
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
