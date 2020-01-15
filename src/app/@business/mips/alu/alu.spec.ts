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
});
