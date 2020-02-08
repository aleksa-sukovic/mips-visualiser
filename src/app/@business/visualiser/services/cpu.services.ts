import { Injectable } from '@angular/core';
import { CPU } from '../../mips/cpu/cpu';

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

    public next (): boolean
    {
        this.cpu.execute();

        return this.cpu.done();
    }

    public all (): void
    {
        while (!this.next()) {
            //
        }
    }

    public get cpu (): CPU
    {
        return this._cpu;
    }
}
