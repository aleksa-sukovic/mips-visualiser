import { Injectable } from '@angular/core';
import { CPU } from '../../mips/cpu/cpu';
import { BinaryEncoder } from '../../mips/library/binary-encoder/binary-encoder';
import { CPUService } from './cpu.services';
import config from '../../mips/library/config';

@Injectable({
    providedIn: 'root',
})
export class RegistersService
{
    protected _cpu: CPU;
    protected _encoder: BinaryEncoder;
    protected _registers: any[];

    public constructor (private cpuService: CPUService)
    {
        this._cpu = cpuService.cpu;
        this._encoder = new BinaryEncoder();
        this._registers = [];

        this.initializeRegisters(this._cpu);
    }

    public updateRegister (id: string, value: string): void
    {
        this._cpu.register(id).value = this._encoder.binary(parseInt(value, 10), config.word_length);

        this.initializeRegisters(this._cpu);
    }

    public registers ()
    {
        return this._registers;
    }

    private initializeRegisters (cpu: CPU): void
    {
        this._registers.splice(0, this._registers.length);

        for (const register of cpu.registers()) {
            this._registers.push({
                id: register.binary,
                alias: register.aliases.join(' / '),
                value: this._encoder.number(register.value),
                edit: false,
                editValue: '',
                editable: register.editable,
            });
        }
    }
}
