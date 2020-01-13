import { OverflowException } from '../exceptions/overflow-exception';

export class BinaryConverter
{
    public static fromBase10 (value: number, length: number = 0): string
    {
        if (!value) { return BinaryConverter.pad('0', length); }

        let result = '';
        value = Math.abs(value);

        while (value > 0) {
            result = value % 2 + result;
            value = Math.floor(value / 2);
        }

        return BinaryConverter.pad(result, length);
    }

    public static fromBinary (value: string): number
    {
        let result = 0;
        let multiple = 0;

        for (let i = value.length - 1; i >= 0; i--) {
            result += Math.pow(2, multiple++) * Number(value[i]);
        }

        return result;
    }

    public static fromTwosComplement (value: string): number
    {
        if (/^0+$/g.test(value)) { return 0; }

        const sign = value[0] === '1' ? -1 : 1;

        return sign * BinaryConverter.fromBinary(BinaryConverter.addOne(BinaryConverter.flip(value)));
    }

    public static twosComplement (value: number, length: number = 0): string
    {
        if (value === 0) { return BinaryConverter.pad('0', length); }

        const result = BinaryConverter.addOne(BinaryConverter.flip(BinaryConverter.fromBase10(value)));
        const sign = value < 0 ? '1' : '0';

        if (sign.length + result.length > length) { throw new OverflowException(value, length); }

        return sign + BinaryConverter.pad(result, length - 1, '1');
    }

    public static flip (binary: string, length: number = 0): string
    {
        let result = '';

        for (const digit of binary) {
            result += digit === '1' ? '0' : '1';
        }

        return BinaryConverter.pad(result, length, '1');
    }

    public static addOne (binary: string): string
    {
        let carry = 0;

        for (let i = binary.length - 1; i >= 0; i--) {
            if (binary[i] === '1') {
                binary = binary.substr(0, i) + '0' + binary.substr(i + 1);
                carry = 1;
            } else {
                binary = binary.substr(0, i) + '1' + binary.substr(i + 1);
                carry = 0;
                break;
            }
        }

        return (carry === 1 ? '1' : '') + binary;
    }

    public static pad (binary: string, length: number, pad: string = '0'): string
    {
        while (binary.length < length) { binary = pad + binary; }

        return binary;
    }
}
