import { Instruction } from '../instruction';
import { InstructionEncoder } from '../encoders/instruction-encoder';
import { ClockFactory } from '../../clock/factories/clock-factory';
import Config from '../../library/config/config';

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
        const instructionCfg = Config.get().instructions.find(it => it.opcode === instruction.op);

        instruction.clocks = instructionCfg.clocks.map(it => ClockFactory.fromId(it));
        instruction.type = instructionCfg.type;

        return instruction;
    }

    public static fromSpecification (specification: any): Instruction
    {
        let binary = '';

        switch (specification.type) {
            case 'R':
                binary = specification.opcode + '00000000000000000000' + Config.get().funct;
                break;
            default:
                binary = specification.opcode + '00000000000000000000000000';
                break;
        }
        const clocks = specification.clocks.forEach(it => ClockFactory.fromId(it));

        return new Instruction(binary, clocks);
    }
}
