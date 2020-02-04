import { ALU } from '../alu/alu';
import { Control } from '../control/control';
import { Memory } from '../memory/memory';
import { Register } from '../register/models/register';
import { Clock } from '../clock/clock';
import { Instruction } from '../instruction/instruction';
import config from '../library/config';

export class CPU
{
    protected _alu: ALU;
    protected _control: Control;
    protected _memory: Memory;
    protected _clocks: Clock[];
    protected _registers: Register[];
    protected _currentClock: number;
    protected _instruction: Instruction;

    public constructor ()
    {
        this._alu = new ALU(config.word_length);
        this._control = new Control();
        this._memory = new Memory();
        this._clocks = [];
        this._registers = config.registers;
        this._currentClock = 0;
        this._instruction = null;
    }

    public simulate (instruction: Instruction): void
    {
        this._instruction = instruction;
        this._clocks = instruction.clocks;
        this._currentClock = 0;
        this._memory.set(this.register('$pc').value, instruction.binary);
    }

    public nextClock (): void
    {
        if (!this._clocks[this._currentClock]) { return; }

        this._control.reset();
        this._clocks[this._currentClock++].execute(this);
    }

    public execute (): void
    {
        while (this._clocks[this._currentClock]) {
            this.nextClock();
        }
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

    public get instruction ()
    {
        return this._instruction;
    }

    public register (value: string): Register
    {
        return this._registers.find(it => it.hasAlias(value) || it.binary === value);
    }
}
