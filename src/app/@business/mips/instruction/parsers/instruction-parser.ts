import { InstructionNotFoundException } from '../exceptions/instruction-not-found-exception';
import { Instruction } from '../instruction';
import config from '../../library/config';

export abstract class InstructionParser
{
    public abstract parse (instruction: string): string;
    public abstract regex (): RegExp;

    public match (instruction: string): boolean
    {
        instruction = instruction.replace(/\s\s+/g, ' ');

        return this.regex().test(instruction);
    }

    protected instruction (value: string): Instruction
    {
        for (const instruction of config.instructions) {
            if (value.startsWith(instruction.alias)) {
                return instruction;
            }
        }

        throw new InstructionNotFoundException(value);
    }
}
