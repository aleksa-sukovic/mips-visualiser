import { Instruction } from '../instruction';
import { InstructionEncoder } from '../encoders/instruction-encoder';

export class InstructionFactory
{
    protected static encoder = new InstructionEncoder();

    public static fromSymbolic (symbolic: string): Instruction
    {
        return new Instruction(InstructionFactory.encoder.encode(symbolic));
    }

    public static fromBinary (binary: string): Instruction
    {
        return new Instruction(binary);
    }
}
