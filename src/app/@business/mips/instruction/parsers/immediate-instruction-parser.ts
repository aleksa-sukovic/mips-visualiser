import { InstructionParser } from './instruction-parser';
import { Register } from '../../register/models/register';
import { RegisterNotFoundException } from '../exceptions/register-not-found-exception';
import { BinaryEncoder } from '../../library/binary-encoder/binary-encoder';
import { RegisterFactory } from '../../register/factories/register-factory';
import Config from '../../library/config/config';

export class ImmediateInstructionParser extends InstructionParser
{
    private _encoder: BinaryEncoder;

    public constructor ()
    {
        super();
        this._encoder = new BinaryEncoder();
    }

    public parse (value: string): string
    {
        const args = this.instructionArgs(value);

        const rs = this.register(args[1]).binary;
        const rt = this.register(args[0]).binary;
        const immediate = this.number(args[2]);

        return this.instruction(value).opcode + rs + rt + this._encoder.binary(immediate, 16);
    }

    protected instructionArgs (value: string): string[]
    {
        value = value.split(this.instruction(value).alias)[1];

        return value.split(/,/g).map(it => it.trim());
    }

    protected register (value: string): Register
    {
        const registers = Config.get().registers.map(it => RegisterFactory.fromSpecification(it));
        const register = registers.find(it => it.hasAlias(value));

        if (!register) {
            throw new RegisterNotFoundException(value);
        }

        return register;
    }

    protected number (value: string): number
    {
        return Number(value).valueOf();
    }

    public regex (): RegExp
    {
        return /[A-Za-z]+ \$[a-z0-9]+, ?\$[a-z0-9]+, ?[-+]?[0-9]+/;
    }
}
