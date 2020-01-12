export class BaseException extends Error
{
    public constructor (message: string)
    {
        super();

        this.message = message;
    }
}
