import { ALU } from '../alu/alu';
import { Control } from '../control/control';
import { Memory } from '../memory/memory';
import { Register } from '../register/models/register';

export class CPU
{
    protected _alu: ALU;
    protected _control: Control;
    protected _memory: Memory;
    protected _$0: Register;
    protected _$1: Register;
    protected _$2: Register;
    protected _$3: Register;
    protected _$4: Register;
    protected _$5: Register;
    protected _$6: Register;
    protected _$7: Register;
    protected _$8: Register;
    protected _$9: Register;
    protected _$10: Register;
    protected _$11: Register;
    protected _$12: Register;
    protected _$13: Register;
    protected _$14: Register;
    protected _$15: Register;
    protected _$16: Register;
    protected _$17: Register;
    protected _$18: Register;
    protected _$19: Register;
    protected _$20: Register;
    protected _$21: Register;
    protected _$22: Register;
    protected _$23: Register;
    protected _$24: Register;
    protected _$25: Register;
    protected _$26: Register;
    protected _$27: Register;
    protected _$28: Register;
    protected _$29: Register;
    protected _$30: Register;
    protected _$31: Register;

    public constructor ()
    {
        this._alu = new ALU();
        this._control = new Control();
        this._memory = new Memory();
        this._$0 = new Register(['$zero'], '00000');
        this._$1 = new Register(['$at'], '00001');
        this._$2 = new Register(['$v0'], '00010');
        this._$3 = new Register(['$v1'], '00011');
        this._$4 = new Register(['$a0'], '00100');
        this._$5 = new Register(['$a1'], '00101');
        this._$6 = new Register(['$a2'], '00110');
        this._$7 = new Register(['$a3'], '00111');
        this._$8 = new Register(['$t0'], '01000');
        this._$9 = new Register(['$t1'], '01001');
        this._$10 = new Register(['$t2'], '01010');
        this._$11 = new Register(['$t3'], '01011');
        this._$12 = new Register(['$t4'], '01100');
        this._$13 = new Register(['$t5'], '01101');
        this._$14 = new Register(['$t6'], '01110');
        this._$15 = new Register(['$t7'], '01111');
        this._$16 = new Register(['$s0'], '10000');
        this._$17 = new Register(['$s1'], '10001');
        this._$18 = new Register(['$s2'], '10010');
        this._$19 = new Register(['$s3'], '10011');
        this._$20 = new Register(['$s4'], '10100');
        this._$21 = new Register(['$s5'], '10101');
        this._$22 = new Register(['$s6'], '10110');
        this._$23 = new Register(['$s7'], '10111');
        this._$24 = new Register(['$t8'], '11000');
        this._$25 = new Register(['$t9'], '11001');
        this._$26 = new Register(['$k0'], '11010');
        this._$27 = new Register(['$k1'], '11011');
        this._$28 = new Register(['$gp'], '11100');
        this._$29 = new Register(['$sp'], '11101');
        this._$30 = new Register(['$fp'], '11110');
        this._$31 = new Register(['$ra'], '11111');
    }

    public get alu ()
    {
        return this._alu;
    }

    public get control ()
    {
        return this._control;
    }

    public get memory ()
    {
        return this._memory;
    }
}
