import { ALU } from '../alu/alu';
import { Control } from '../control/control';
import { Memory } from '../memory/memory';
import { Register } from '../register/models/register';
import { Clock } from '../clock/clock';
import { Instruction } from '../instruction/instruction';

export class CPU
{
    protected _alu: ALU;
    protected _control: Control;
    protected _memory: Memory;
    protected _clocks: Clock[];
    protected _currentClock: number;
    private _$0: Register;
    private _$1: Register;
    private _$2: Register;
    private _$3: Register;
    private _$4: Register;
    private _$5: Register;
    private _$6: Register;
    private _$7: Register;
    private _$8: Register;
    private _$9: Register;
    private _$10: Register;
    private _$11: Register;
    private _$12: Register;
    private _$13: Register;
    private _$14: Register;
    private _$15: Register;
    private _$16: Register;
    private _$17: Register;
    private _$18: Register;
    private _$19: Register;
    private _$20: Register;
    private _$21: Register;
    private _$22: Register;
    private _$23: Register;
    private _$24: Register;
    private _$25: Register;
    private _$26: Register;
    private _$27: Register;
    private _$28: Register;
    private _$29: Register;
    private _$30: Register;
    private _$31: Register;

    public constructor ()
    {
        this._alu = new ALU();
        this._control = new Control();
        this._memory = new Memory();
        this._clocks = [];
        this._currentClock = 0;
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

    public simulate (instruction: Instruction): void
    {
        this._clocks = instruction.clocks;
        this._currentClock = 0;
    }

    public nextClock (): void
    {
        if (!this._clocks[this._currentClock]) { return; }

        this._clocks[this._currentClock++].execute(this);
    }


    public done (): boolean
    {
        return this._currentClock === this._clocks.length;
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

    public get $0 (): Register
    {
        return this._$0;
    }

    public get $1 (): Register
    {
        return this._$1;
    }

    public get $2 (): Register
    {
        return this._$2;
    }

    public get $3 (): Register
    {
        return this._$3;
    }

    public get $4 (): Register
    {
        return this._$4;
    }

    public get $5 (): Register
    {
        return this._$5;
    }

    public get $6 (): Register
    {
        return this._$6;
    }

    public get $7 (): Register
    {
        return this._$7;
    }

    public get $8 (): Register
    {
        return this._$8;
    }

    public get $9 (): Register
    {
        return this._$9;
    }

    public get $10 (): Register
    {
        return this._$10;
    }

    public get $11 (): Register
    {
        return this._$11;
    }

    public get $12 (): Register
    {
        return this._$12;
    }

    public get $13 (): Register
    {
        return this._$13;
    }

    public get $14 (): Register
    {
        return this._$14;
    }

    public get $15 (): Register
    {
        return this._$15;
    }

    public get $16 (): Register
    {
        return this._$16;
    }

    public get $17 (): Register
    {
        return this._$17;
    }

    public get $18 (): Register
    {
        return this._$18;
    }

    public get $19 (): Register
    {
        return this._$19;
    }

    public get $20 (): Register
    {
        return this._$20;
    }

    public get $21 (): Register
    {
        return this._$21;
    }

    public get $22 (): Register
    {
        return this._$22;
    }

    public get $23 (): Register
    {
        return this._$23;
    }

    public get $24 (): Register
    {
        return this._$24;
    }

    public get $25 (): Register
    {
        return this._$25;
    }

    public get $26 (): Register
    {
        return this._$26;
    }

    public get $27 (): Register
    {
        return this._$27;
    }

    public get $28 (): Register
    {
        return this._$28;
    }

    public get $29 (): Register
    {
        return this._$29;
    }

    public get $30 (): Register
    {
        return this._$30;
    }

    public get $31 (): Register
    {
        return this._$31;
    }
}
