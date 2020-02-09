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
import { CPU } from '../cpu/cpu';
import { Clock } from '../clock/clock';
import { NullClock } from '../clock/Null/NullClock';
import { BinaryEncoder } from './binary-encoder/binary-encoder';

const encoder = new BinaryEncoder();

export function findClockConfig (clock: Clock) {
    return config.clocks.find(it => it.id === clock.id()) || findClockConfig(new NullClock());
}

export function findTooltipForElement (element, clock: Clock = null) {
    if (!clock) {
        return config.global_tooltips.find(it => it.ids.find(id => id == element.id));
    }

    return findClockConfig(clock).tooltips.find(it => it.ids.find(id => id == element.id));
}

export function isElementFocused (element, clock: Clock) {
   return findClockConfig(clock).focus.find(it => it == element.id) !== undefined;
}

export function isElementTextNode (element) {
    return config.visual.nodes.text.find(it => it == element.id);
}

export function isElementArrow (element) {
    return config.visual.nodes.arrows.find(it => it == element.id);
}

export function findInstructionByOpcode (opcode: string) {
    return config.instructions.find(it => it.opcode === opcode);
}

const config = {
    word_length: 32,
    visual: {
        animationDuration: 3000,
        emphasizeColor: '#f30',
        emphasizeTextColor: '#fff',
        deEmphasizeColor: '#00CEFF',
        deEmphasizeTextColor: '#000',
        opacitySteps: [
            { opacity: 1 },
            { opacity: 0.9 },
            { opacity: 0.8 },
            { opacity: 0.7 },
            { opacity: 0.6 },
            { opacity: 0.5 },
            { opacity: 0.4 },
            { opacity: 0.3 },
            { opacity: 0.2 },
        ],
        inactiveOpacity: 0.2,
        nodes: {
            text: [
                'Control_claim', 'Control_text', 'Control_op_text', 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169,
                170, 171, 172, 'PC_text', 'lorD_0_text', 'lorD_text', 'lorD_1_text', 'read_address_label_text', 'mem_data_label_text',
                'write_address_label_text', 'write_data_label_text_1', 'instruction_label', 'instruction_25_0_label_text', 'instruction_31_26_label_text',
                79, 80, 81, 78, 'RegDst_0_text', 'RegDst_text', 'RegDst_1_text', 'MemToReg_text', 'MemToReg_0_text', 'MemToReg_1_text',
                'read_register_1_label_text', 'read_register_2_label_text', 'write_register_label_text_2', 'write_data_label_text_2', 'registers_label',
                'read_data_1_label_text', 'read_data_2_label_text', 'Sign_Extend_text', 77, 75, 51, 'SHL_2_x2_text', 'ALU_Control_text', 50,
                'ALUSelB_0_text', 'ALUSelB_1_text', 'ALUSelB_2_text', 'ALUSelB_3_text', 'ALUSelA_0_text', 'ALUSelA_1_text', 'ALUSelA_text', 76,
                'ALU_text', 'ALU_zero_label_text', 'ALU_result_label_text', 48, 'SHL_2_x2_text_1', 'Target_text', 46, 'PCSource_1_text',
                'PCSource_1_text', 'PCSource_2_text', 'PCSource_text',
            ],
            arrows: [
                96, 97, 99, 98, 100, 101, 126, 108, 107, 110, 111, 106, 109, 124, 125, 123, 119, 118, 120, 122, 121, 15, 105, 104, 105, 117, 116,
                103, 115, 112, 113, 114, 102,
            ],
        },
    },
    instructions: [
        {
            alias: 'add',
            opcode: '000000',
            funct: '100000',
            type: 'R',
            clocks: [
                new Clock1(32),
                new Clock2(32),
                new Clock4(),
                new Clock9(),
            ],
        },
        {
            alias: 'addi',
            opcode: '001000',
            funct: '',
            type: 'R',
            clocks: [
                new Clock1(32),
                new Clock2(32),
                new Clock4(),
                new Clock9(),
            ],
        },
        {
            alias: 'sub',
            opcode: '000000',
            funct: '100010',
            type: 'R',
            clocks: [
                new Clock1(32),
                new Clock2(32),
                new Clock4(),
                new Clock9(),
            ],
        },
        {
            alias: 'j',
            opcode: '000010',
            funct: '',
            type: 'J',
            clocks: [
                new Clock1(32),
                new Clock2(32),
                new Clock6(),
            ],
        },
        {
            alias: 'beq',
            opcode: '000100',
            funct: '',
            type: 'I',
            clocks: [
                new Clock1(32),
                new Clock2(32),
                new Clock5(),
            ],
        },
        {
            alias: 'bne',
            opcode: '000101',
            funct: '',
            type: 'I',
            clocks: [
                new Clock1(32),
                new Clock2(32),
                new Clock5(),
            ],
        },
        {
            alias: 'lw',
            opcode: '100011',
            funct: '',
            type: 'I',
            clocks: [
                new Clock1(32),
                new Clock2(32),
                new Clock3(32),
                new Clock7(),
                new Clock10(),
            ],
        },
        {
            alias: 'sw',
            opcode: '101011',
            funct: '',
            type: 'I',
            clocks: [
                new Clock1(32),
                new Clock2(32),
                new Clock3(32),
                new Clock8(),
            ],
        },
    ],
    registers: [
        new Register(['$ir'], 'ir', '00000000000000000000000000000000', false),
        new Register(['$pc'], 'pc', '00000000000000000000000000000000', false),
        new Register(['$target'], 'target', '00000000000000000000000000000000', false),
        new Register(['$memData'], 'memData', '00000000000000000000000000000000', false),
        new Register(['$0', '$zero'], '00000', '00000000000000000000000000000000', false),
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
    global_tooltips: [
        // Instructions
        {
            ids: ['instruction_add'],
            title: '<div class="text-gray-900">ADD <br><span class="text-gray-500 text-sm font-normal italic">add $1, $2, $3</span></div>',
            description: '<div>Adds registers $2 and $3 and stores the result in $1.</div>',
            value: (cpu: CPU) => null,
        },
        {
            ids: ['instruction_addi'],
            title: '<div class="text-gray-900">ADDI <br><span class="text-gray-500 text-sm font-normal italic">addi $1, $2, 256</span></div>',
            description: '<div>Adds register $2 and sign-extended immediate value and stores the result in $1.</div>',
            value: (cpu: CPU) => null,
        },
        {
            ids: ['instruction_sub'],
            title: '<div class="text-gray-900">SUB <br><span class="text-gray-500 text-sm font-normal italic">sub $1, $2, $3</span></div>',
            description: '<div>Subtracts register $3 from register $2 and stores the result in $1.</div>',
            value: (cpu: CPU) => null,
        },
        {
            ids: ['instruction_beq'],
            title: '<div class="text-gray-900">BEQ <br><span class="text-gray-500 text-sm font-normal italic">beq $1, $2, 1500</span></div>',
            description: '<div>Branches if registers $1 and $2 are equal.</div>',
            value: (cpu: CPU) => null,
        },
        {
            ids: ['instruction_bne'],
            title: '<div class="text-gray-900">BNE <br><span class="text-gray-500 text-sm font-normal italic">bne $1, $2, 1500</span></div>',
            description: '<div>Branches if registers $1 and $2 are not equal.</div>',
            value: (cpu: CPU) => null,
        },
        {
            ids: ['instruction_lw'],
            title: '<div class="text-gray-900">LW <br><span class="text-gray-500 text-sm font-normal italic">lw $1, 256($2)</span></div>',
            description: '<div>Loads word into $1 register from specified address.</div>',
            value: (cpu: CPU) => null,
        },
        {
            ids: ['instruction_sw'],
            title: '<div class="text-gray-900">LW <br><span class="text-gray-500 text-sm font-normal italic">sw $1, 256($2)</span></div>',
            description: '<div>Stores the contents of $1 register at specified address.</div>',
            value: (cpu: CPU) => null,
        },
        // Player
        {
            ids: ['player_execute'],
            title: 'Execute',
            description: '<div>Executes loaded instruction, step by step.</div>',
            value: (cpu: CPU) => null,
        },
        {
            ids: ['player_forward'],
            title: 'Next clock',
            description: '<div>Executes the next instruction clock.</div>',
            value: (cpu: CPU) => null,
        },
        // Registers
        {
            ids: ['register_ir'],
            title: '$ir / Instruction Register',
            description: '<div>Register holding the instruction currently being executed.</div>',
            value: (cpu: CPU) => cpu.register('$0').value,
        },
        {
            ids: ['register_pc'],
            title: '$pc / Program Counter',
            description: '<div>Register holding the address of next instruction to be executed.</div>',
            value: (cpu: CPU) => cpu.register('$0').value,
        },
        {
            ids: ['register_target'],
            title: '$target / Target',
            description: '<div>Register holding target jump address calculated in clock 2 of every instruction.</div>',
            value: (cpu: CPU) => cpu.register('$0').value,
        },
        {
            ids: ['register_memData'],
            title: 'Memory Data',
            description: '<div>Not an actual register, rather a helper container for data read from memory used by this visualisation.</div>',
            value: (cpu: CPU) => cpu.register('$0').value,
        },
        {
            ids: ['register_00000'],
            title: '$0 / $zero',
            description: '<div>Register constant.</div>',
            value: (cpu: CPU) => cpu.register('$0').value,
        },
        {
            ids: ['register_00001'],
            title: '$1 / $at',
            description: '<div>Register reserved for assembler.</div>',
            value: (cpu: CPU) => cpu.register('$1').value,
        },
        {
            ids: ['register_00010'],
            title: '$2 / $v0',
            description: '<div>Used for expression evaluation and function result.</div>',
            value: (cpu: CPU) => cpu.register('$2').value,
        },
        {
            ids: ['register_00011'],
            title: '$3 / $v1',
            description: '<div>Used for expression evaluation and function result.</div>',
            value: (cpu: CPU) => cpu.register('$3').value,
        },
        {
            ids: ['register_00100'],
            title: '$4 / $a0',
            description: '<div>Used for passing arguments.</div>',
            value: (cpu: CPU) => cpu.register('$4').value,
        },
        {
            ids: ['register_00101'],
            title: '$5 / $a1',
            description: '<div>Used for passing arguments.</div>',
            value: (cpu: CPU) => cpu.register('$5').value,
        },
        {
            ids: ['register_00110'],
            title: '$6 / $a2',
            description: '<div>Used for passing arguments.</div>',
            value: (cpu: CPU) => cpu.register('$6').value,
        },
        {
            ids: ['register_00111'],
            title: '$7 / $a3',
            description: '<div>Used for passing arguments.</div>',
            value: (cpu: CPU) => cpu.register('$7').value,
        },
        {
            ids: ['register_01000'],
            title: '$8 / $t0',
            description: '<div>Temporary register, not preserved between function calls.</div>',
            value: (cpu: CPU) => cpu.register('$8').value,
        },
        {
            ids: ['register_01001'],
            title: '$9 / $t1',
            description: '<div>Temporary register, not preserved between function calls.</div>',
            value: (cpu: CPU) => cpu.register('$9').value,
        },
        {
            ids: ['register_01010'],
            title: '$10 / $t2',
            description: '<div>Temporary register, not preserved between function calls.</div>',
            value: (cpu: CPU) => cpu.register('$10').value,
        },
        {
            ids: ['register_01011'],
            title: '$11 / $t3',
            description: '<div>Temporary register, not preserved between function calls.</div>',
            value: (cpu: CPU) => cpu.register('$11').value,
        },
        {
            ids: ['register_01100'],
            title: '$12 / $t4',
            description: '<div>Temporary register, not preserved between function calls.</div>',
            value: (cpu: CPU) => cpu.register('$12').value,
        },
        {
            ids: ['register_01101'],
            title: '$13 / $t5',
            description: '<div>Temporary register, not preserved between function calls.</div>',
            value: (cpu: CPU) => cpu.register('$13').value,
        },
        {
            ids: ['register_01110'],
            title: '$14 / $t6',
            description: '<div>Temporary register, not preserved between function calls.</div>',
            value: (cpu: CPU) => cpu.register('$14').value,
        },
        {
            ids: ['register_01111'],
            title: '$15 / $t7',
            description: '<div>Temporary register, not preserved between function calls.</div>',
            value: (cpu: CPU) => cpu.register('$15').value,
        },
        {
            ids: ['register_10000'],
            title: '$16 / $s0',
            description: '<div>Saved temporary register, preserved between function calls.</div>',
            value: (cpu: CPU) => cpu.register('$16').value,
        },
        {
            ids: ['register_10001'],
            title: '$17 / $s1',
            description: '<div>Saved temporary register, preserved between function calls.</div>',
            value: (cpu: CPU) => cpu.register('$17').value,
        },
        {
            ids: ['register_10010'],
            title: '$18 / $s2',
            description: '<div>Saved temporary register, preserved between function calls.</div>',
            value: (cpu: CPU) => cpu.register('$18').value,
        },
        {
            ids: ['register_10011'],
            title: '$19 / $s3',
            description: '<div>Saved temporary register, preserved between function calls.</div>',
            value: (cpu: CPU) => cpu.register('$19').value,
        },
        {
            ids: ['register_10100'],
            title: '$20 / $s4',
            description: '<div>Saved temporary register, preserved between function calls.</div>',
            value: (cpu: CPU) => cpu.register('$20').value,
        },
        {
            ids: ['register_10101'],
            title: '$21 / $s5',
            description: '<div>Saved temporary register, preserved between function calls.</div>',
            value: (cpu: CPU) => cpu.register('$21').value,
        },
        {
            ids: ['register_10110'],
            title: '$22 / $s6',
            description: '<div>Saved temporary register, preserved between function calls.</div>',
            value: (cpu: CPU) => cpu.register('$22').value,
        },
        {
            ids: ['register_10111'],
            title: '$23 / $s7',
            description: '<div>Saved temporary register, preserved between function calls.</div>',
            value: (cpu: CPU) => cpu.register('$23').value,
        },
        {
            ids: ['register_11000'],
            title: '$24 / $t8',
            description: '<div>Temporary register, not preserved between function calls.</div>',
            value: (cpu: CPU) => cpu.register('$24').value,
        },
        {
            ids: ['register_11001'],
            title: '$25 / $t9',
            description: '<div>Temporary register, not preserved between function calls.</div>',
            value: (cpu: CPU) => cpu.register('$25').value,
        },
        {
            ids: ['register_11010'],
            title: '$26 / $k0',
            description: '<div>Register reserved for OS kernel.</div>',
            value: (cpu: CPU) => cpu.register('$26').value,
        },
        {
            ids: ['register_11011'],
            title: '$27 / $k1',
            description: '<div>Register reserved for OS kernel.</div>',
            value: (cpu: CPU) => cpu.register('$27').value,
        },
        {
            ids: ['register_11100'],
            title: '$28 / $gp',
            description: '<div>Register pointing to global area.</div>',
            value: (cpu: CPU) => cpu.register('$28').value,
        },
        {
            ids: ['register_11101'],
            title: '$29 / $sp',
            description: '<div>Register known as stack pointer.</div>',
            value: (cpu: CPU) => cpu.register('$29').value,
        },
        {
            ids: ['register_11110'],
            title: '$30 / $fp',
            description: '<div>Register known as frame pointer.</div>',
            value: (cpu: CPU) => cpu.register('$29').value,
        },
        {
            ids: ['register_11111'],
            title: '$31 / $ra',
            description: '<div>Register storing return address, used by function calls.</div>',
            value: (cpu: CPU) => cpu.register('$31').value,
        }
    ],
    clocks: [
        {
            id: 'null_clock',
            focus: [],
            tooltips: [],
        },
        {
            id: 'clock_1',
            focus: [
                // Control
                'Control_background', 'Control_text', 'Control_claim', 'Control_background',
                // MemRead
                181, 162,
                // AluSelA
                170, 174,
                // lorD
                161, 180, 'lorD_background', 'lorD_text', 'lorD_0_text', 'lorD_0_dot', 130, 98,
                // irWrite
                164, 183,
                // Alu SelB
                169, 187, 'ALUSelB_background', 'ALUSelB_text', 'ALUSelB_1_dot', 'ALUSelB_1_text', 120, 35, 50, 21, 117,
                // Alu SelA
                'ALUSelA_background', 'ALUSelA_0_dot', 'ALUSelA_0_text', 'ALUSelA_text', 22, 116,
                // AluOP
                168, 186,
                // pcWrite
                159, 175, 177, 'OR_gate_background', 127, 129, 139, 97,
                // pcSource
                166, 185, 13,
                // memory
                'memory_background', 'mem_data_label_text', 'mem_data_label_dot', 'read_address_label_text', 'read_address_label_dot',
                'memory_label',
                134, 135, 156, 126,
                // pc
                'PC_background', 'PC_text', 128, 91, 140, 12, 18, 33, 104,
                // Instruction register
                'instruction_background', 'instruction_label',
                // ALU
                'ALU_background', 'ALU_text', 'ALU_result_label_text', 'ALU_result_label_dot', 32, 143,
                23, 11, 25, 141, 28, 112, 'ALU_Control_background', 'ALU_Control_text', 37,
                // MemToReg
                'MemToReg_background', 'PCSource_0_dot', 'PCSource_0_text', 26, 96,
            ],
            tooltips: [
                {
                    ids: [128, 91, 33, 13, 22, 116, 18, 104, 'ALUSelA_background', 'ALUSelA_0_dot', 'ALUSelA_0_text', 'ALUSelA_text', 'ALUSelA_1_text', 'ALUSelA_1_dot'],
                    title: 'PC Value',
                    description: '<div>Value of PC is brought as first operand of ALU.</div>',
                    value: (cpu: CPU) => encoder.number(cpu.register('$pc').value).toString(10),
                }
            ],
        }
    ],
};

export default config;
