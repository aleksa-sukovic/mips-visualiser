import { InstructionParser } from './instruction-parser';
import { BinaryConverter } from '../../library/binary-converter/binary-converter';
import { Register } from '../../register/models/register';
import config from '../../library/config';
import { RegisterNotFoundException } from '../exceptions/register-not-found-exception';

export class DataTransferInstructionParser extends InstructionParser
{
    private converter: BinaryConverter;

    public constructor ()
    {
        super();
        this.converter = new BinaryConverter();
    }

    public parse (value: string): string
    {
        const args = this.arguments(value);

        const rs = this.register(args[0]);
        const rt = this.register(args[1]);
        const addr = this.converter.binary(Number(args[2]), 16);

        return this.instruction(value).opcode + rs.binary + rt.binary + addr;
    }

    protected register (value: string): Register
    {
        const register = config.registers.find(it => it.hasAlias(value));

        if (!register) {
            throw new RegisterNotFoundException(value);
        }

        return register;
    }

    protected arguments (value: string): string[]
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
