export class Control
{
    protected _pcWrite: string;

    public set pcWrite (value: string)
    {
        this._pcWrite = value;
    }

    public get pcWrite ()
    {
        return this._pcWrite;
    }
}
