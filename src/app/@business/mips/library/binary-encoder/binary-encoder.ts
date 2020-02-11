import { OverflowException } from '../exceptions/overflow-exception';
import { Str } from '../utilities/str';

export class BinaryEncoder
{
    public number (binary: string): number
    {
        if (/^0+$/g.test(binary)) {
            return 0;
        } else if (binary[0] === '0') {
            return this.unsignedNumber(binary.substr(1));
        } else {
            return -1 * this.unsignedNumber(this.addOne(this.flip(binary.substr(1))));
        }
    }

    public unsignedNumber (binary: string): number
    {
        let result = 0;
        let multiple = 0;

        for (let i = binary.length - 1; i >= 0; i--) {
            result += Math.pow(2, multiple++) * Number(binary[i]);
        }

        return result;
    }

    public binary (value: number, length: number = 0): string
    {
        if (value === 0) {
            return this.pad('0', length);
        } else if (value > 0) {
            const binary = this.unsignedBinary(value);
            if (length && binary.length + 1 > length) { throw new OverflowException(value, length); }
            return '0' + this.pad(binary, length - 1, '0');
        } else {
            const result = this.addOne(this.flip(this.unsignedBinary(value)));
            if (length && result.length + 1 > length) { throw new OverflowException(value, length); }
            return '1' + this.pad(result, length - 1, '1');
        }
    }

    public unsignedBinary (value: number, length: number = 0): string
    {
        if (value === 0) { return this.pad('0', length); }

        let result = '';
        value = Math.abs(value);

        while (value > 0) {
            result = value % 2 + result;
            value = Math.floor(value / 2);
        }

        return this.pad(result, length);
    }

    public flip (binary: string, length: number = 0): string
    {
        let result = '';

        for (const digit of binary) {
            result += digit === '1' ? '0' : '1';
        }

        return this.pad(result, length, '1');
    }

    public addOne (binary: string): string
    {
        let carry = 0;

        for (let i = binary.length - 1; i >= 0; i--) {
            if (binary[i] === '1') {
                binary = Str.insertAt(binary, '0', i);
                carry = 1;
            } else {
                binary = Str.insertAt(binary, '1', i);
                carry = 0;
                break;
            }
        }

        return (carry === 1 ? '1' : '') + binary;
    }

    public signPad (binary: string, length: number): string
    {
        return binary.startsWith('0') ?
            this.pad(binary, length, '0') : this.pad(binary, length, '1');
    }

    public pad (binary: string, length: number, pad: string = '0'): string
    {
        while (binary.length < length) { binary = pad + binary; }

        return binary;
    }
}
