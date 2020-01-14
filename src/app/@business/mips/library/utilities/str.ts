export class Str
{
    public static insertAt (value: string, insert: string, position: number): string
    {
        return value.substr(0, position) + insert + value.substr(position + 1);
    }
}
