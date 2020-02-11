import { ALU } from '../alu/alu';
import { Control } from '../control/control';
import { Memory } from '../memory/memory';
import { Register } from '../register/models/register';
import { Clock } from '../clock/clock';
import { Instruction } from '../instruction/instruction';
import { NullClock } from '../clock/Null/NullClock';
import { BinaryEncoder } from '../library/binary-encoder/binary-encoder';
import Config from '../library/config/config';
import { RegisterFactory } from '../register/factories/register-factory';

export class CPU
{
    protected _alu: ALU;
    protected _control: Control;
    protected _memory: Memory;
    protected _clocks: Clock[];
    protected _registers: Register[];
    protected _currentClock: number;
    protected _instruction: Instruction;
    protected _encoder: BinaryEncoder;

    public constructor ()
    {
        this._alu = new ALU(Config.get().word_length);
        this._control = new Control();
        this._memory = new Memory();
        this._encoder = new BinaryEncoder();
        this._clocks = [];
        this._registers = Config.get().registers.map(it => RegisterFactory.fromSpecification(it));
        this._currentClock = -1;
        this._instruction = null;
    }

    public simulate (instruction: Instruction): void
    {
        this._instruction = instruction;
        this._clocks = instruction.clocks;
        this._currentClock = -1;
        this._memory.set(this.register('$pc').value, instruction.binary);
    }

    public nextClock (): void
    {
        this._currentClock += 1;

        if (this._clocks[this._currentClock]) {
            this._control.reset();
            this._clocks[this._currentClock].execute(this);
        }
    }

    public currentClock (): Clock
    {
        return this._clocks[this._currentClock] || new NullClock();
    }

    public currentClockIndex (): number
    {
        return this._currentClock;
    }

    public execute (): void
    {
        while (!this.done()) {
            this.nextClock();
        }
    }

    public done (): boolean
    {
        return this._currentClock >= this._clocks.length - 1;
    }

    public reset (): void
    {
        this.memory.reset();
        this._registers.forEach(it => it.value = this._encoder.binary(0, Config.get().word_length));
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

    public registers (): Register[]
    {
        return this._registers;
    }
}
