import { Register } from '../register/models/register';
import { Instruction } from '../instruction/instruction';

export default {
    instructions: [
        new Instruction('add', '000000'),
        new Instruction('addi', '001000'),
        new Instruction('j', '000010'),
        new Instruction('beq', '000100'),
        new Instruction('bne', '000101'),
        new Instruction('lw', '100011'),
        new Instruction('sw', '101011'),
    ],
    registers: [
        new Register(['$0', '$zero'], '00000'),
        new Register(['$1', '$at'], '00001'),
        new Register(['$2', '$v0'], '00010'),
        new Register(['$3', '$v1'], '00011'),
    ],
};
