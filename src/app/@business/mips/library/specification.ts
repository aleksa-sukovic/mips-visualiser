import { CPU } from '../cpu/cpu';
import { BinaryEncoder } from './binary-encoder/binary-encoder';

const encoder = new BinaryEncoder();

const Specification = {
    word_length: 32,
    visual: {
        animationDuration: 1000,
        emphasizeColor: '#dd6b20',
        emphasizeTextColor: '#fff',
        emphasizeLabelColor: '#fff',
        emphasizeComponentColor: '#c05621',
        deEmphasizeColor: '#2a4365',
        deEmphasizeTextColor: '#000',
        deEmphasizeLabelColor: '#fff',
        deEmphasizeComponentColor: '#2c5282',
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
            labels: [
                'PC_text', 'lorD_text', 'lorD_0_text', 'lorD_1_text', 'lorD_1_dot', 'lorD_0_dot', 'memory_label', 'read_address_label_text', 'read_address_label_dot',
                'write_address_label_text', 'write_address_label_dot', 'write_data_label_text_1', 'write_data_label_dot_1', 'mem_data_label_text', 'mem_data_label_dot',
                'instruction_label', 'instruction_25_0_label_text', 'instruction_31_26_label_text', 'instruction_25_0_label_dot', 'instruction_31_26_label_dot',
                'RegDst_0_text', 'RegDst_0_dot', 'RegDst_1_text', 'RegDst_1_dot', 'RegDst_text', 'MemToReg_0_text', 'MemToReg_0_dot', 'MemToReg_text', 'MemToReg_1_text', 'MemToReg_1_text',
                'read_register_1_label_text', 'read_register_1_label_dot', 'read_register_2_label_text', 'read_register_2_label_dot', 'registers_label', 'read_data_1_label_text',
                'read_data_1_label_dot', 'read_data_2_label_text', 'read_data_2_label_dot', 'Sign_Extend_text', 'SHL_2_x2_text', 'ALU_Control_text',
                'ALUSelB_text', 'ALUSelB_0_text', 'ALUSelB_0_dot', 'ALUSelB_1_text', 'ALUSelB_1_dot', 'ALUSelB_2_text', 'ALUSelB_2_dot', 'ALUSelB_3_text', 'ALUSelB_3_dot',
                'ALUSelA_0_text', 'ALUSelA_0_dot', 'ALUSelA_1_text', 'ALUSelA_1_dot', 'ALUSelA_text',
                'ALU_text', 'ALU_zero_label_text', 'ALU_zero_label_dot', 'ALU_result_label_text', 'ALU_result_label_dot', 'SHL_2_x2_text_1', 'Target_text',
                'PCSource_text', 'PCSource_0_dot', 'PCSource_0_text', 'PCSource_1_dot', 'PCSource_1_text', 'PCSource_2_dot', 'PCSource_2_text',
                'write_register_label_text_2', 'write_register_label_dot', 'write_data_label_text_2', 'write_data_label_dot_2',
                'Control_claim', 'Control_text', 'Control_op_text', 'Control_dot',
            ],
            components: [
                'ALU_background', 'SHL_2_x2_background', 'ALU_Control_background', 'SHL_2_x2_background_1', 'Control_background', 'Sign_Extend_background',
                'PC_background', 'lorD_background', 'memory_background', 'OR_gate_background', 'AND_gate_background', 'instruction_background', 'RegDst_background',
                'MemToReg_Background', 'registers_background', 'ALUSelA_background', 'ALUSelB_background', 'Target_background', 'MemToReg_background',
            ]
        },
    },
    instructions: [
        {
            alias: 'add',
            opcode: '000000',
            funct: '100000',
            type: 'R',
            clocks: [
                'clock_1',
                'clock_2',
                'clock_4',
                'clock_9',
            ],
        },
        {
            alias: 'addi',
            opcode: '001000',
            funct: '',
            type: 'I',
            clocks: [
                'clock_1',
                'clock_2',
                'clock_3',
                'clock_9',
            ],
        },
        {
            alias: 'sub',
            opcode: '000000',
            funct: '100010',
            type: 'R',
            clocks: [
                'clock_1',
                'clock_2',
                'clock_4',
                'clock_9',
            ],
        },
        {
            alias: 'j',
            opcode: '000010',
            funct: '',
            type: 'J',
            clocks: [
                'clock_1',
                'clock_2',
                'clock_6',
            ],
        },
        {
            alias: 'beq',
            opcode: '000100',
            funct: '',
            type: 'I',
            clocks: [
                'clock_1',
                'clock_2',
                'clock_5',
            ],
        },
        {
            alias: 'bne',
            opcode: '000101',
            funct: '',
            type: 'I',
            clocks: [
                'clock_1',
                'clock_2',
                'clock_5',
            ],
        },
        {
            alias: 'lw',
            opcode: '100011',
            funct: '',
            type: 'I',
            clocks: [
                'clock_1',
                'clock_2',
                'clock_3',
                'clock_7',
                'clock_10',
            ],
        },
        {
            alias: 'sw',
            opcode: '101011',
            funct: '',
            type: 'I',
            clocks: [
                'clock_1',
                'clock_2',
                'clock_3',
                'clock_8',
            ],
        },
    ],
    registers: [
        {
            id: 'ir',
            aliases: ['$ir'],
            value:  0,
            editable: false,
            visible: true,
        },
        {
            id: 'pc',
            aliases: ['$pc'],
            value:  0,
            editable: false,
            visible: true,
        },
        {
            id: 'target',
            aliases: ['$target'],
            value:  0,
            editable: false,
            visible: true,
        },
        {
            id: 'memData',
            aliases: ['$memData'],
            value:  0,
            editable: false,
            visible: false,
        },
        {
            id: '00000',
            aliases: ['$0', '$zero'],
            value:  0,
            editable: true,
            visible: true,
        },
        {
            id: '00001',
            aliases: ['$1', '$at'],
            value:  0,
            editable: true,
            visible: true,
        },
        {
            id: '00010',
            aliases: ['$2', '$v0'],
            value:  0,
            editable: true,
            visible: true,
        },
        {
            id: '00011',
            aliases: ['$3', '$v1'],
            value:  0,
            editable: true,
            visible: true,
        },
        {
            id: '00100',
            aliases: ['$4', '$a0'],
            value:  0,
            editable: true,
            visible: true,
        },
        {
            id: '00101',
            aliases: ['$5', '$a1'],
            value:  0,
            editable: true,
            visible: true,
        },
        {
            id: '00110',
            aliases: ['$6', '$a2'],
            value:  0,
            editable: true,
            visible: true,
        },
        {
            id: '00111',
            aliases: ['$7', '$a3'],
            value:  0,
            editable: true,
            visible: true,
        },
        {
            id: '01000',
            aliases: ['$8', '$t0'],
            value:  0,
            editable: true,
            visible: true,
        },
        {
            id: '01001',
            aliases: ['$9', '$t1'],
            value:  0,
            editable: true,
            visible: true,
        },
        {
            id: '01010',
            aliases: ['$10', '$t2'],
            value:  0,
            editable: true,
            visible: true,
        },
        {
            id: '01011',
            aliases: ['$11', '$t3'],
            value:  0,
            editable: true,
            visible: true,
        },
        {
            id: '01100',
            aliases: ['$12', '$t4'],
            value:  0,
            editable: true,
            visible: true,
        },
        {
            id: '01101',
            aliases: ['$13', '$t5'],
            value:  0,
            editable: true,
            visible: true,
        },
        {
            id: '01110',
            aliases: ['$14', '$t6'],
            value:  0,
            editable: true,
            visible: true,
        },
        {
            id: '01111',
            aliases: ['$15', '$t7'],
            value:  0,
            editable: true,
            visible: true,
        },
        {
            id: '10000',
            aliases: ['$16', '$s0'],
            value:  0,
            editable: true,
            visible: true,
        },
        {
            id: '10001',
            aliases: ['$17', '$s1'],
            value:  0,
            editable: true,
            visible: true,
        },
        {
            id: '10010',
            aliases: ['$18', '$s2'],
            value:  0,
            editable: true,
            visible: true,
        },
        {
            id: '10010',
            aliases: ['$18', '$s2'],
            value:  0,
            editable: true,
            visible: true,
        },
        {
            id: '10011',
            aliases: ['$19', '$s3'],
            value:  0,
            editable: true,
            visible: true,
        },
        {
            id: '10100',
            aliases: ['$20', '$s4'],
            value:  0,
            editable: true,
            visible: true,
        },
        {
            id: '10101',
            aliases: ['$21', '$s5'],
            value:  0,
            editable: true,
            visible: true,
        },
        {
            id: '10110',
            aliases: ['$22', '$s6'],
            value:  0,
            editable: true,
            visible: true,
        },
        {
            id: '10111',
            aliases: ['$23', '$s7'],
            value:  0,
            editable: true,
            visible: true,
        },
        {
            id: '11000',
            aliases: ['$24', '$t8'],
            value:  0,
            editable: true,
            visible: true,
        },
        {
            id: '11001',
            aliases: ['$25', '$t9'],
            value:  0,
            editable: true,
            visible: true,
        },
        {
            id: '11010',
            aliases: ['$26', '$k0'],
            value:  0,
            editable: true,
            visible: true,
        },
        {
            id: '11011',
            aliases: ['$27', '$k1'],
            value:  0,
            editable: true,
            visible: true,
        },
        {
            id: '11100',
            aliases: ['$28', '$gp'],
            value:  0,
            editable: true,
            visible: true,
        },
        {
            id: '11101',
            aliases: ['$29', '$sp'],
            value:  0,
            editable: true,
            visible: true,
        },
        {
            id: '11110',
            aliases: ['$30', '$fp'],
            value:  0,
            editable: true,
            visible: true,
        },
        {
            id: '11111',
            aliases: ['$31', '$ra'],
            value:  0,
            editable: true,
            visible: true,
        },
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
            value: (cpu: CPU) => cpu.register('ir').value,
        },
        {
            ids: ['register_pc'],
            title: '$pc / Program Counter',
            description: '<div>Register holding the address of next instruction to be executed.</div>',
            value: (cpu: CPU) => cpu.register('pc').value,
        },
        {
            ids: ['register_target'],
            title: '$target / Target',
            description: '<div>Register holding target jump address calculated in clock 2 of every instruction.</div>',
            value: (cpu: CPU) => cpu.register('target').value,
        },
        {
            ids: ['register_memData'],
            title: 'Memory Data',
            description: '<div>Not an actual register, rather a helper container for data read from memory used by this visualisation.</div>',
            value: (cpu: CPU) => cpu.register('memData').value,
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
        },
        {
            id: 'clock_2',
            focus: [
                // Control
                'Control_background', 'Control_text', 'Control_claim', 'Control_background', 'Control_op_text',
                // AluSelA
                170, 174, 140, 91, 13, 128, 139, 127, 33, 18, 12, 104, 22, 116,
                'ALUSelA_background', 'ALUSelA_0_dot', 'ALUSelA_0_text', 'ALUSelA_text',
                // Alu SelB
               'ALUSelB_background', 'ALUSelB_text', 21, 117,
                // AluOP
                168, 186,
                // AluControl
                'ALU_Control_background', 'ALU_Control_text', 37,
                // ALU
                'ALU_background', 'ALU_text', 'ALU_result_label_text', 'ALU_result_label_dot', 32, 143,
                // TargetWrite
                167, 173,
                // PC
                'PC_text', 'PC_background',
                // Target
                11, 23, 25, 31, 115, 141, 'Target_text', 'Target_background',
                // Instruction register
                'instruction_background', 'instruction_label', 'instruction_25_0_label_text', 'instruction_25_0_label_dot',
                'instruction_31_26_label_text', 'instruction_31_26_label_dot',
                // AluOP from instruction
                158, 13, 34, 102,
                // Instruction load
                95, 151, 152, 84, 83, 90, 107, '154', '153', '125', '109', '108', '94', '82', '74', 'RegDst_background', 'RegDst_text', 'RegDst_0_text', 'RegDst_0_dot', 'RegDst_1_text', 'RegDst_1_dot',
                '186', '148', '147', '123', '121', '119', '89', '75', '190', '69', '62', '61', '60', '59', '53', '52', '51', '49', '36', '4', 'Sign_Extend_text', 'ALUSelB_background', 'ALUSelB_text', 'ALUSelB_3_text', 'ALUSelB_3_dot', 'SHL_2_x2_text', 'SHL_2_x2_background', 'Sign_Extend_background',
                87, 93, 155, 106,
                // Registers
                'registers_background', 'registers_label', 'read_register_1_label_dot', 'read_register_1_label_text', 'read_register_2_label_dot', 'read_register_2_label_text', 'write_register_label_dot', 'write_register_label_text_2',
                // Jump offset
                '142', '114', '88', '86', '85', '48', '47', '46', '45', '30', '29', '24', '19', 'SHL_2_x2_text_1', 'MemToReg_background', 'PCSource_text', 'PCSource_2_text', 'PCSource_2_dot', 'SHL_2_x2_background_1',
            ],
            tooltips: [

            ],
        }
    ],
};

export default Specification;
