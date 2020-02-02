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

    it('sets operation field', () => {
        alu.operation = '000000';

        expect(alu.operation).toBe('000000');
    });

    it('sets funct field', () => {
        alu.funct = '001010';

        expect(alu.funct).toBe('001010');
    });

    it('adds number when operation is 00', () => {
        alu.op1 = '001';
        alu.op2 = '010';
        alu.operation = '00';

        alu.execute();

        expect(alu.result).toBe('011');
    });
});
