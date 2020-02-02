import {ALU} from './alu';

describe('ALU', () => {
    let alu;

    beforeEach(() => alu = new ALU());

    it('sets op1 and op2', () => {
        alu.op1 = '0101';
        alu.op2 = '1001';

        expect(alu.op1).toBe('0101');
        expect(alu.op2).toBe('1001');
    });

    it('sets op field', () => {
        alu.op = '000000';

        expect(alu.op).toBe('000000');
    });

    it('sets funct field', () => {
        alu.funct = '001010';

        expect(alu.funct).toBe('001010');
    });

    it('adds input when op is 00', () => {
        alu.op1 = '001';
        alu.op2 = '010';
        alu.op = '00';

        alu.execute();

        expect(alu.result).toBe('011');
    });

    it('subtracts input when op is x1', () => {
        alu.op1 = '010';
        alu.op2 = '001';
        alu.op = 'x1';

        alu.execute();

        expect(alu.result).toBe('001');
    });

    it('adds input based on funct field', () => {
        alu.op1 = '000';
        alu.op2 = '001';
        alu.op = '1x';
        alu.funct = '000000';

        alu.execute();

        expect(alu.result).toBe('001');
    });

    it('subtract input based on funct field', () => {
        alu.op1 = '0100';
        alu.op2 = '0010';
        alu.op = '1x';
        alu.funct = 'xx0010';

        alu.execute();

        expect(alu.result).toBe('0010');
    });

    it('does bitwise AND based on funct field', () => {
        alu.op1 = '1111';
        alu.op2 = '1010';
        alu.op = '1x';
        alu.funct = 'xx0100';

        alu.execute();

        expect(alu.result).toBe('1010');
    });

    it('does bitwise OR based on funct field', () => {
        alu.op1 = '0101';
        alu.op2 = '1010';
        alu.op = '1x';
        alu.funct = 'xx0101';

        alu.execute();

        expect(alu.result).toBe('1111');
    });
});
