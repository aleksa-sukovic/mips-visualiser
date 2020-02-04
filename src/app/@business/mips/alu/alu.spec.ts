import {ALU} from './alu';

describe('ALU', () => {
    let alu;

    beforeEach(() => {
        alu = new ALU(4);
    });

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
        alu.op1 = '0001';
        alu.op2 = '0010';
        alu.op = '00';

        alu.execute();

        expect(alu.result).toBe('0011');
    });

    it('subtracts input when op is x1', () => {
        alu.op1 = '0010';
        alu.op2 = '0001';
        alu.op = 'x1';

        alu.execute();

        expect(alu.result).toBe('0001');
    });

    it('adds input based on funct field', () => {
        alu.op1 = '0000';
        alu.op2 = '0001';
        alu.op = '1x';
        alu.funct = '100000';

        alu.execute();

        expect(alu.result).toBe('0001');
    });

    it('subtract input based on funct field', () => {
        alu.op1 = '0100';
        alu.op2 = '0010';
        alu.op = '1x';
        alu.funct = '100010';

        alu.execute();

        expect(alu.result).toBe('0010');
    });

    it('does bitwise AND based on funct field', () => {
        alu.op1 = '1111';
        alu.op2 = '1010';
        alu.op = '1x';
        alu.funct = '100100';

        alu.execute();

        expect(alu.result).toBe('1010');
    });

    it('does bitwise OR based on funct field', () => {
        alu.op1 = '0101';
        alu.op2 = '1010';
        alu.op = '1x';
        alu.funct = '100101';

        alu.execute();

        expect(alu.result).toBe('1111');
    });

    it('sets result to 1 if op1 < than op2 (SLT)', () => {
        alu.op1 = '0001';
        alu.op2 = '0010';
        alu.op = '1x';
        alu.funct = '101010';

        alu.execute();

        expect(alu.result).toBe('0001');
    });


    it('sets result to 0 if op1 >= than op2 (SLT)', () => {
        alu.op1 = '0010';
        alu.op2 = '0000';
        alu.op = '1x';
        alu.funct = '101010';

        alu.execute();

        expect(alu.result).toBe('0000');
    });

    it('sets zero signal to 0 if result is 0', () => {
        alu.op1 = '0000';
        alu.op2 = '0000';
        alu.op = '00';

        alu.execute();

        expect(alu.zero).toBe('1');
    });


    it('sets zero signal to 0 if result is != 0', () => {
        alu.op1 = '0001';
        alu.op2 = '0000';
        alu.op = '00';

        alu.execute();

        expect(alu.zero).toBe('0');
    });
});
