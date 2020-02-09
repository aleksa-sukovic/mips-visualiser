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

    public destroy (key: string): void
    {
        delete this._store[key];
    }

    public reset (): void
    {
        for (const key in this._store) {
            if (this._store.hasOwnProperty(key)) {
                delete this._store[key];
            }
        }
    }

    public addresses (): any[]
    {
        const result = [];
        for (const key in this._store) {
            if (this._store.hasOwnProperty(key)) {
                result.push(key);
            }
        }
        return result;
    }

    public store (): any
    {
        return this._store;
    }
}
