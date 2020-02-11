import { InstructionParser } from './instruction-parser';
import { BinaryEncoder } from '../../library/binary-encoder/binary-encoder';

export class JumpInstructionParser extends InstructionParser
{
    private _encoder: BinaryEncoder;

    public constructor ()
    {
        super();
        this._encoder = new BinaryEncoder();
    }

    public parse (value: string): string
    {
        const immediate = this.number(this.immediate(value));

        return this.instruction(value).opcode + this._encoder.binary(immediate, 26);
    }

    protected immediate (value: string): string
    {
        return value.split(this.instruction(value).alias)[1].trim();
    }

    protected number (value: string): number
    {
        return Number(value);
    }

    public regex (): RegExp
    {
        return /j ?[0-9]+/;
    }
}
