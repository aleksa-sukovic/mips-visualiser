import { InstructionParser } from './instruction-parser';
import { Register } from '../../register/models/register';
import config from '../../library/config';
import { RegisterNotFoundException } from '../exceptions/register-not-found-exception';
import { BinaryConverter } from '../../library/binary-converter/binary-converter';

export class ImmediateInstructionParser extends InstructionParser
{
    public parse (value: string): string
    {
        const args = this.arguments(value);

        const rs = this.register(args[0]).binary;
        const rt = this.register(args[1]).binary;
        const immediate = this.number(args[2]);

        return this.instruction(value).opcode + rs + rt + BinaryConverter.fromBase10(immediate, 16);
    }

    protected arguments (value: string): string[]
    {
        value = value.split(this.instruction(value).alias)[1];

        return value.split(/,/g).map(it => it.trim());
    }

    protected register (value: string): Register
    {
        const register = config.registers.find(it => it.hasAlias(value));

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
