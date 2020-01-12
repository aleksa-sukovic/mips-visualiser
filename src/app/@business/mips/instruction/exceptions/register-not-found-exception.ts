import { BaseException } from '../../library/exceptions/base-exception';

export class RegisterNotFoundException extends BaseException
{
    protected registerName: string;

    public constructor (registerName: string)
    {
        super(`Register '${registerName}' was not found.`);

        this.registerName = registerName;
    }

    public get register (): string
    {
        return this.registerName;
    }
}
