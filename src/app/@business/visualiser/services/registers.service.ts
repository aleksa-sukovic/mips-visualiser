import { Injectable } from '@angular/core';
import { CPU } from '../../mips/cpu/cpu';
import { BinaryEncoder } from '../../mips/library/binary-encoder/binary-encoder';
import { CPUService } from './cpu.services';
import Config from '../../mips/library/config/config';

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

        this.refreshRegisters();
    }

    public updateRegister (id: string, value: string): void
    {
        this._cpu.register(id).value = this._encoder.binary(parseInt(value, 10) || 0, Config.get().word_length);

        this.refreshRegisters();
    }

    public registers ()
    {
        return this._registers;
    }

    public refreshRegisters (): void
    {
        this._registers.splice(0, this._registers.length);

        for (const register of this.cpuService.cpu.registers()) {
            this._registers.push({
                id: register.binary,
                alias: register.aliases.join(' / '),
                value: this._encoder.number(register.value),
                edit: false,
                editValue: '',
                editable: register.editable,
                visible: register.visible,
            });
        }
    }
}
