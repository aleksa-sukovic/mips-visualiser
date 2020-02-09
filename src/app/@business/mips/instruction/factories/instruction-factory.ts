import { Instruction } from '../instruction';
import { InstructionEncoder } from '../encoders/instruction-encoder';
import { Clock } from '../../clock/clock';
import config, { findInstructionByOpcode } from '../../library/config';

export class InstructionFactory
{
    protected static encoder = new InstructionEncoder();

    public static fromSymbolic (symbolic: string): Instruction
    {
        const instruction = InstructionFactory.fromBinary(InstructionFactory.encoder.encode(symbolic));
        instruction.symbolic = symbolic;

        return instruction;
    }

    public static fromBinary (binary: string): Instruction
    {
        const instruction = new Instruction(binary, []);
        const instructionCfg = findInstructionByOpcode(instruction.op);

        instruction.clocks = InstructionFactory.clocks(instructionCfg.opcode);
        instruction.type = instructionCfg.type;

        return instruction;
    }

    private static clocks (opcode: string): Clock[]
    {
        const instruction = config.instructions.find(it => it.opcode === opcode);

        return instruction ? instruction.clocks : [];
    }
}
