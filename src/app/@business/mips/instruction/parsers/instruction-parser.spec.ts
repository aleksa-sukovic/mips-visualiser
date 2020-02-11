import { RegisterInstructionParser } from './register-instruction-parser';
import { InstructionNotFoundException } from '../exceptions/instruction-not-found-exception';
import { RegisterNotFoundException } from '../exceptions/register-not-found-exception';
import { ImmediateInstructionParser } from './immediate-instruction-parser';
import { OverflowException } from '../../library/exceptions/overflow-exception';
import { JumpInstructionParser } from './jump-instruction-parser';
import { DataTransferInstructionParser } from './data-transfer-instruction-parser';

describe('Register instruction parser', () => {
    let parser: RegisterInstructionParser;

    beforeAll(() => {
        parser = new RegisterInstructionParser();
    });

    it('recognises R-type instruction', ()  => {
        const instruction1 = 'add $x, $y, $z';
        const instruction2 = 'ADD $x,$y,$z';
        const instruction3 = 'AdD $x,      $y, $z';

        expect(parser.match(instruction1)).toBe(true);
        expect(parser.match(instruction2)).toBe(true);
        expect(parser.match(instruction3)).toBe(true);
    });

    it('dismisses instructions of inappropriate type', ()  => {
        const instruction1 = 'lw $x, 1024($y)';
        const instruction2 = 'jal 2048';
        const instruction3 = 'beq $x, $y, 1024';

        expect(parser.match(instruction1)).toBe(false);
        expect(parser.match(instruction2)).toBe(false);
        expect(parser.match(instruction3)).toBe(false);
    });

    it('parses R-type instruction', () => {
        const instruction = 'add $1, $2, $3';
        const binary = '000000,00010,00011,00001,00000,100000';

        expect(parser.parse(instruction).length).toBe(32);
        expect(parser.parse(instruction)).toBe(binary.replace(/,/g, ''));
    });

    it('parses R-type instruction with register aliases', () => {
        const instruction = 'add $v0, $1, $v1';
        const binary = '000000,00001,00011,00010,00000,100000';

        expect(parser.parse(instruction)).toBe(binary.replace(/,/g, ''));
    });

    it('sets funct field for add instructions', () => {
        const instruction = 'add $1, $2, $3';
        const binary = '000000,00010,00011,00001,00000,100000';

        expect(parser.parse(instruction)).toBe(binary.replace(/,/g, ''));
    });

    it('sets funct field for sub instructions', () => {
        const instruction = 'sub $1, $2, $3';
        const binary = '000000,00010,00011,00001,00000,100010';

        expect(parser.parse(instruction)).toBe(binary.replace(/,/g, ''));
    });

    it('throws exception if instruction is not found', () => {
        const instruction = 'nope $1, $2, $3';

        expect(() => parser.parse(instruction)).toThrow(new InstructionNotFoundException('nope $1, $2, $3'));
    });

    it('throws exception if register is not found', () => {
        const instruction = 'add $1, $nope, $3';

        expect(() => parser.parse(instruction)).toThrow(new RegisterNotFoundException('$nope'));
    });
});

describe('Immediate instruction parser', () => {
    let parser: ImmediateInstructionParser;

    beforeAll(() => {
        parser = new ImmediateInstructionParser();
    });

    it('recognizes I-type instructions', ()  => {
        const instruction1 = 'addi $1, $2, 15';
        const instruction2 = 'addi $2, $3, -145';
        const instruction3 = 'addi $v0, $v1, +76';

        expect(parser.match(instruction1)).toBe(true);
        expect(parser.match(instruction2)).toBe(true);
        expect(parser.match(instruction3)).toBe(true);
    });

    it('dismisses instructions of inappropriate type', ()  => {
        const instruction1 = 'add $1, $2, $3';
        const instruction2 = 'j 5096';
        const instruction3 = 'sw $x, 0($y)';

        expect(parser.match(instruction1)).toBe(false);
        expect(parser.match(instruction2)).toBe(false);
        expect(parser.match(instruction3)).toBe(false);
    });

    it('parses I-type instruction', () => {
        const instruction = 'addi $1, $v1, 15';
        const binary = '001000,00011,00001,0000000000001111';

        expect(parser.parse(instruction)).toBe(binary.replace(/,/g, ''));
    });

    it('parses I-type instruction with negative immediate field', () => {
        const instruction = 'addi $1, $2, -15';
        const binary = '001000,00010,00001,1111111111110001';

        expect(parser.parse(instruction)).toBe(binary.replace(/,/g, ''));
    });

    it('parses I-type instruction with positive immediate field', () => {
        const instruction = 'addi $1, $2, 16';
        const binary = '001000,00010,00001,0000000000010000';

        expect(parser.parse(instruction)).toBe(binary.replace(/,/g, ''));
    });

    it('throws exception if immediate value is out of bounds', () => {
        const instruction = 'addi $1, $2, 12345678910';

        expect(() => parser.parse(instruction)).toThrow(new OverflowException(12345678910, 16));
    });

    it('throws exception if register is not found', () => {
        const instruction = 'addi $1, $a, 1024';

        expect(() => parser.parse(instruction)).toThrow(new RegisterNotFoundException('$a'));
    });

    it('throws exception if instruction is not found', () => {
        const instruction = 'nope $1, $2, $3';

        expect(() => parser.parse(instruction)).toThrow(new InstructionNotFoundException('nope $1, $2, $3'));
    });
});

describe('Jump instruction parser', () => {
    let parser: JumpInstructionParser;

    beforeAll(() => {
        parser = new JumpInstructionParser();
    });

    it('recognizes J-type instructions', () => {
        const instruction = 'j 2056';

        expect(parser.match(instruction)).toBe(true);
    });

    it('dismisses instructions of inappropriate type', ()  => {
        const instruction1 = 'add $1, $2, $3';
        const instruction2 = 'sw $x, 0($y)';

        expect(parser.match(instruction1)).toBe(false);
        expect(parser.match(instruction2)).toBe(false);
    });

    it('parses J-type instruction', () => {
        const instruction = 'j 16';
        const binary = '000010,00000000000000000000010000';

        expect(parser.parse(instruction)).toBe(binary.replace(/,/g, ''));
    });
});


describe('Data transfer instruction parser', () => {
    let parser: DataTransferInstructionParser;

    beforeAll(() => {
        parser = new DataTransferInstructionParser();
    });

    it('recognizes I-type instructions', () => {
        const instruction1 = 'lw $1, 1024($2)';
        const instruction2 = 'sw $v0, 0($1)';
        const instruction3 = 'lw $1, -256($0)';

        expect(parser.match(instruction1)).toBe(true);
        expect(parser.match(instruction2)).toBe(true);
        expect(parser.match(instruction3)).toBe(true);
    });

    it('dismisses instructions of inappropriate type', ()  => {
        const instruction1 = 'add $1, $2, $3';
        const instruction2 = 'beq $x, $y, 1024';
        const instruction3 = 'j 5096';

        expect(parser.match(instruction1)).toBe(false);
        expect(parser.match(instruction2)).toBe(false);
        expect(parser.match(instruction3)).toBe(false);
    });

    it('parses J-type instruction', () => {
        const instruction = 'lw $1, 8($2)';
        const binary = '100011,00010,00001,0000000000001000';

        expect(parser.parse(instruction)).toBe(binary.replace(/,/g, ''));
    });

    it('parses J-type instruction with negative offset', () => {
        const instruction = 'sw $1, -8($2)';
        const binary = '101011,00010,00001,1111111111111000';

        expect(parser.parse(instruction)).toBe(binary.replace(/,/g, ''));
    });

    it('throws exception if register is not found', () => {
        const instruction = 'sw $n, -8($2)';

        expect(() => parser.parse(instruction)).toThrow(new RegisterNotFoundException('$n'));
    });

    it('throws exception if immediate value is out of bounds', () => {
        const instruction = 'sw $1, 12345678910($0)';

        expect(() => parser.parse(instruction)).toThrow(new OverflowException(12345678910, 16));
    });
});
