import { Instruction } from '../instruction';
import { InstructionEncoder } from '../encoders/instruction-encoder';
import { Clock } from '../../clock/clock';
import config from '../../library/config';

export class InstructionFactory
{
    protected static encoder = new InstructionEncoder();

    public static fromSymbolic (symbolic: string): Instruction
    {
        return InstructionFactory.fromBinary(
            InstructionFactory.encoder.encode(symbolic),
        );
    }

    public static fromBinary (binary: string): Instruction
    {
        const instruction = new Instruction(binary, []);

        instruction.clocks = InstructionFactory.clocks(instruction.op);
        
        return instruction;
    }

    private static clocks (opcode: string): Clock[]
    {
        const instruction = config.instructions.find(it => it.opcode === opcode);

        return instruction ? instruction.clocks : [];
    }
}
