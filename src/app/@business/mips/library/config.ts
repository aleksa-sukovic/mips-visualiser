import { Register } from '../register/models/register';

export default {
    instructions: [
        { alias: 'add', opcode: '000000' },
        { alias: 'addi', opcode: '001000' },
        { alias: 'j', opcode: '000010' },
        { alias: 'beq', opcode: '000100' },
        { alias: 'bne', opcode: '000101' },
        { alias: 'lw', opcode: '100011' },
        { alias: 'sw', opcode: '101011' },
    ],
    registers: [
        new Register(['$0', '$zero'], '00000'),
        new Register(['$1', '$at'], '00001'),
        new Register(['$2', '$v0'], '00010'),
        new Register(['$3', '$v1'], '00011'),
    ],
};
