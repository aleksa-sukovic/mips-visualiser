import { Injectable } from '@angular/core';
import { CPU } from '../../mips/cpu/cpu';
import { Clock } from '../../mips/clock/clock';
import { InstructionFactory } from '../../mips/instruction/factories/instruction-factory';
import { Instruction } from '../../mips/instruction/instruction';

@Injectable({
    providedIn: 'root',
})
export class CPUService
{
    protected _cpu: CPU;
    protected _loaded: boolean;
    protected _executing: boolean;
    protected _executedClocks: number;

    public constructor ()
    {
        this._cpu = new CPU();
        this._loaded = false;
        this._executing = false;
        this._executedClocks = 0;
    }

    public load (instruction: string): void
    {
        this.cpu.simulate(InstructionFactory.fromSymbolic(instruction));
        this._loaded = true;
        this._executing = false;
        this._executedClocks = 0;
    }

    public next (): boolean
    {
        this.cpu.nextClock();

        this._executing = !this.cpu.done();
        this._loaded = this._executing;
        this._executedClocks += 1;

        return this._executing;
    }

    public get clock (): Clock
    {
        return this.cpu.currentClock();
    }

    public get clockIndex (): number
    {
        return this.cpu.currentClockIndex();
    }

    public get executing (): boolean
    {
        return this._executing;
    }

    public get instruction (): Instruction
    {
        return this._cpu.instruction;
    }

    public get executedClocks (): number
    {
        return this._executedClocks;
    }

    public get loaded (): boolean
    {
        return this._loaded;
    }

    public get cpu (): CPU
    {
        return this._cpu;
    }
}
