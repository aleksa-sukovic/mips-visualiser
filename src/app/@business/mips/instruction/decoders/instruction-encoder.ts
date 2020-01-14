import { InstructionParser } from '../parsers/instruction-parser';
import { DataTransferInstructionParser } from '../parsers/data-transfer-instruction-parser';
import { ImmediateInstructionParser } from '../parsers/immediate-instruction-parser';
import { JumpInstructionParser } from '../parsers/jump-instruction-parser';
import { RegisterInstructionParser } from '../parsers/register-instruction-parser';
import { InstructionNotFoundException } from '../exceptions/instruction-not-found-exception';

export class InstructionEncoder
{
    protected parsers: InstructionParser[] = [
        new DataTransferInstructionParser(),
        new ImmediateInstructionParser(),
        new JumpInstructionParser(),
        new RegisterInstructionParser()
    ];

    public encode (instruction: string): string
    {
        for (const parser of this.parsers) {
            if (parser.match(instruction)) {
                return parser.parse(instruction);
            }
        }

        throw new InstructionNotFoundException(instruction);
    }
}
