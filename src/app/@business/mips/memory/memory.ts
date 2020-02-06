export class Memory
{
    protected _store: any;

    public constructor ()
    {
        this._store = {};
    }

    public set (key: string, value: any): void
    {
        this._store[key] = value;
    }

    public get (key: string): any
    {
        return this._store[key];
    }

    public store (): any
    {
        return this._store;
    }
}
