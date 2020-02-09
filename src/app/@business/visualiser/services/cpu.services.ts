import { Injectable } from '@angular/core';
import { CPU } from '../../mips/cpu/cpu';
import { Clock } from '../../mips/clock/clock';
import { InstructionFactory } from '../../mips/instruction/factories/instruction-factory';

@Injectable({
    providedIn: 'root',
})
export class CPUService
{
    protected _cpu: CPU;

    public constructor ()
    {
        this._cpu = new CPU();
    }

    public load (instruction: string): void
    {
        this.cpu.simulate(InstructionFactory.fromSymbolic(instruction));
    }

    public next (): boolean
    {
        this.cpu.nextClock();

        return this.cpu.done();
    }

    public get clock (): Clock
    {
        return this.cpu.currentClock();
    }

    public get clockIndex (): number
    {
        return this.cpu.currentClockIndex();
    }

    public get cpu (): CPU
    {
        return this._cpu;
    }
}
