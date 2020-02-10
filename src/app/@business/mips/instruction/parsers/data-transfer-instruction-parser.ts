import { InstructionParser } from './instruction-parser';
import { BinaryEncoder } from '../../library/binary-encoder/binary-encoder';
import { Register } from '../../register/models/register';
import { RegisterNotFoundException } from '../exceptions/register-not-found-exception';
import { RegisterFactory } from '../../register/factories/register-factory';
import Config from '../../library/config/config';

export class DataTransferInstructionParser extends InstructionParser
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

        const rs = this.register(args[0]);
        const rt = this.register(args[1]);
        const addr = this._encoder.binary(Number(args[2]), 16);

        return this.instruction(value).opcode + rs.binary + rt.binary + addr;
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

    protected instructionArgs (value: string): string[]
    {
        const args = value.split(this.instruction(value).alias)[1].trim();
        const arg1 = args.split(',')[0].trim();
        const arg2 = args.split(',')[1].trim();

        return [
            arg2.substring(arg2.indexOf('(') + 1, arg2.indexOf(')')), // base register
            arg1, // source/destination
            arg2.substring(0, arg2.indexOf('(')), // address
        ];
    }

    public regex (): RegExp
    {
        return /[A-Za-z]+ \$[a-z0-9]+, ?[+-]?[0-9]+ ?\(\$[a-z0-9]+\)/;
    }
}
