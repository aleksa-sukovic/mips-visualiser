import { BaseException } from '../../library/exceptions/base-exception';

export class InstructionNotFoundException extends BaseException
{
    protected _instruction: string;

    public constructor (instruction: string)
    {
        super(`Instruction '${instruction}' was not found.`);

        this._instruction = instruction;
    }

    public get instruction (): string
    {
        return this._instruction;
    }
}
