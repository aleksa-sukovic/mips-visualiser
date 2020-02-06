import { Register } from '../register/models/register';
import { Clock1 } from '../clock/1/clock-1';
import { Clock2 } from '../clock/2/clock-2';
import { Clock3 } from '../clock/3/clock-3';
import { Clock4 } from '../clock/4/clock-4';
import { Clock5 } from '../clock/5/clock-5';
import { Clock6 } from '../clock/6/clock-6';
import { Clock7 } from '../clock/7/clock-7';
import { Clock8 } from '../clock/8/clock-8';
import { Clock9 } from '../clock/9/clock-9';
import { Clock10 } from '../clock/10/clock-10';

export default {
    word_length: 32,
    instructions: [
        {
            alias: 'add',
            opcode: '000000',
            funct: '100000',
            clocks: [
                new Clock1(),
                new Clock2(),
                new Clock4(),
                new Clock9(),
            ],
        },
        {
            alias: 'addi',
            opcode: '001000',
            funct: '',
            clocks: [
                new Clock1(),
                new Clock2(),
                new Clock4(),
                new Clock9(),
            ],
        },
        {
            alias: 'sub',
            opcode: '000000',
            funct: '100010',
            clocks: [
                new Clock1(),
                new Clock2(),
                new Clock4(),
                new Clock9(),
            ],
        },
        {
            alias: 'j',
            opcode: '000010',
            funct: '',
            clocks: [
                new Clock1(),
                new Clock2(),
                new Clock6(),
            ],
        },
        {
            alias: 'beq',
            opcode: '000100',
            funct: '',
            clocks: [
                new Clock1(),
                new Clock2(),
                new Clock5(),
            ],
        },
        {
            alias: 'bne',
            opcode: '000101',
            funct: '',
            clocks: [
                new Clock1(),
                new Clock2(),
                new Clock5(),
            ],
        },
        {
            alias: 'lw',
            opcode: '100011',
            funct: '',
            clocks: [
                new Clock1(),
                new Clock2(),
                new Clock3(),
                new Clock7(),
                new Clock10(),
            ],
        },
        {
            alias: 'sw',
            opcode: '101011',
            funct: '',
            clocks: [
                new Clock1(),
                new Clock2(),
                new Clock3(),
                new Clock8(),
            ],
        },
    ],
    registers: [
        new Register(['$ir'], 'ir', '0000'),
        new Register(['$pc'], 'pc', '00000'),
        new Register(['$target'], 'target', '00000'),
        new Register(['$memData'], 'memData', '00000'),
        new Register(['$0', '$zero'], '00000'),
        new Register(['$1', '$at'], '00001'),
        new Register(['$2', '$v0'], '00010'),
        new Register(['$3', '$v1'], '00011'),
        new Register(['$4', '$a0'], '00100'),
        new Register(['$5', '$a1'], '00101'),
        new Register(['$6', '$a2'], '00110'),
        new Register(['$7', '$a3'], '00111'),
        new Register(['$8', '$t0'], '01000'),
        new Register(['$9', '$t1'], '01001'),
        new Register(['$10', '$t2'], '01010'),
        new Register(['$11', '$t3'], '01011'),
        new Register(['$12', '$t4'], '01100'),
        new Register(['$13', '$t5'], '01101'),
        new Register(['$14', '$t6'], '01110'),
        new Register(['$15', '$t7'], '01111'),
        new Register(['$16', '$s0'], '10000'),
        new Register(['$17', '$s1'], '10001'),
        new Register(['$18', '$s2'], '10010'),
        new Register(['$19', '$s3'], '10011'),
        new Register(['$20', '$s4'], '10100'),
        new Register(['$21', '$s5'], '10101'),
        new Register(['$22', '$s6'], '10110'),
        new Register(['$23', '$s7'], '10111'),
        new Register(['$24', '$t8'], '11000'),
        new Register(['$25', '$t9'], '11001'),
        new Register(['$26', '$k0'], '11010'),
        new Register(['$27', '$k1'], '11011'),
        new Register(['$28', '$gp'], '11100'),
        new Register(['$29', '$sp'], '11101'),
        new Register(['$30', '$fp'], '11110'),
        new Register(['$31', '$ra'], '11111')
    ],
};
