import { InstructionParser } from './instruction-parser';
import { RegisterNotFoundException } from '../exceptions/register-not-found-exception';
import { Register } from '../../register/models/register';
import config from '../../library/config';

export class RegisterInstructionParser extends InstructionParser
{
    public parse (value: string): string
    {
        const registers = this.registers(this.removeInstructionAlias(value));
        let result = this.instruction(value).opcode;

        for (const registerString of registers) {
            if (!this.register(registerString)) {
                throw new RegisterNotFoundException(registerString);
            }

            result = result + this.register(registerString).binary;
        }

        return result + '00000' + '000000'; // add shamt + funct
    }

    protected registers (value: string): string[]
    {
        return value.split(',').map(it => it.trim());
    }

    protected removeInstructionAlias (value: string): string
    {
        return value.split(this.instruction(value).alias)[1];
    }

    protected register (value: string): Register
    {
        return config.registers.find(it => it.hasAlias(value));
    }

    public regex (): RegExp
    {
        return /[A-Za-z]+ \$[a-z0-9]+, ?\$[a-z0-9]+, ?\$[a-z0-9]+/g;
    }
}
