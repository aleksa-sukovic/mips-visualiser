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

    public static twosComplement (value: number, length: number = 0): string
    {
        if (!value) { return BinaryConverter.pad('0', length); }

        const ones = BinaryConverter.onesComplement(BinaryConverter.fromBase10(value));
        let result = '';
        let carry = 0;

        for (let i = ones.length - 1; i >= 0; i--) {
            if (ones[i] === '1') {
                result = '0' + result;
                carry = 1;
            } else {
                result = '1' + result;
                break;
            }
        }

        result += carry === 1 ? carry : '';

        return BinaryConverter.pad(result, length);
    }

    public static onesComplement (binary: string, length: number = 0): string
    {
        let result = '';

        for (const digit of binary) {
            result += digit === '1' ? '0' : '1';
        }

        return BinaryConverter.pad(result, length, '1');
    }

    public static pad (binary: string, length: number, pad: string = '0'): string
    {
        while (binary.length < length) {
            binary = pad + binary;
        }

        return binary;
    }
}
