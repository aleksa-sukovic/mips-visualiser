export class Memory
{
    protected store: any;

    public constructor ()
    {
        this.store = {};
    }

    public set (key: string, value: any): void
    {
        this.store[key] = value;
    }

    public get (key: string): any
    {
        return this.store[key];
    }
}
