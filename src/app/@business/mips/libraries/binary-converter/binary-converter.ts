export class BinaryConverter
{
    public static fromBase10 (value: number, length: number = 0): string
    {
        if (!value) { return BinaryConverter.pad('0', length); }

        let result = '';
        while (value > 0) {
            result = value % 2 + result;
            value = Math.floor(value / 2);
        }

        return BinaryConverter.pad(result, length);
    }

    public static pad (binary: string, length: number, pad: string = '0'): string
    {
        while (binary.length < length) {
            binary = pad + binary;
        }

        return binary;
    }
}
