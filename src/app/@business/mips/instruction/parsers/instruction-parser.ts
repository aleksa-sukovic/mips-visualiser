import { InstructionNotFoundException } from '../exceptions/instruction-not-found-exception';
import { Instruction } from '../instruction';
import config from '../../library/config';

export abstract class InstructionParser
{
    public abstract parse (instruction: string): string;
    public abstract regex (): RegExp;

    public match (value: string): boolean
    {
        const instruction = value.replace(/\s\s+/g, ' ').toLowerCase();

        return this.regex().test(instruction);
    }

    protected instruction (value: string): Instruction
    {
        for (const instruction of config.instructions) {
            if (value.startsWith(instruction.alias + ' ')) {
                return instruction;
            }
        }

        throw new InstructionNotFoundException(value);
    }
}
