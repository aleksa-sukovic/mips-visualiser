import { Register } from '../register/models/register';
import { Instruction } from '../instruction/instruction';

export default {
    instructions: [
        new Instruction('add', '000000'),
    ],
    registers: [
        new Register(['$0', '$zero'], '00000'),
        new Register(['$1', '$at'], '00001'),
        new Register(['$2', '$v0'], '00010'),
        new Register(['$3', '$v1'], '00011'),
    ],
};
