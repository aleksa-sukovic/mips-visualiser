import { BaseException } from './base-exception';

export class OverflowException extends BaseException
{
    public constructor (value: number, length: number)
    {
        super(`Value '${value}' exceeded the length of ${length}`);
    }
}
