import { Injectable } from '@angular/core';
import config from '../../mips/library/config';
import { CPU } from '../../mips/cpu/cpu';
import { BinaryEncoder } from '../../mips/library/binary-encoder/binary-encoder';

@Injectable({
    providedIn: 'root',
})
export class CPUService
{
    protected cpu: CPU;
    protected encoder: BinaryEncoder;

    protected _memory: any[];
    protected _registers: any[];

    public constructor ()
    {
        this.cpu = new CPU();
        this.encoder = new BinaryEncoder();
        this._memory = [];
        this._registers = [];

        this.initializeMemory(this.cpu);
        this.initializeRegisters(this.cpu);
    }

    public updateRegister (id: string, value: string): void
    {
        this.cpu.register(id).value = this.encoder.binary(parseInt(value, 10), config.word_length);

        this.initializeRegisters(this.cpu);
    }

    public updateMemory (address: string, value: string): void
    {
        this.cpu.memory.set(
            this.encoder.binary(parseInt(address, 10), config.word_length),
            this.encoder.binary(parseInt(value, 10), config.word_length)
        );
        this.initializeMemory(this.cpu);
    }

    public registers ()
    {
        return this._registers;
    }

    public memory (): any[]
    {
        return this._memory;
    }

    private initializeRegisters (cpu: CPU): void
    {
        this._registers.splice(0, this._registers.length);

        for (const register of cpu.registers()) {
            this._registers.push({
                id: register.binary,
                alias: register.aliases.join(' / '),
                value: this.encoder.number(register.value),
                edit: false,
                editValue: '',
            });
        }
    }

    private initializeMemory (cpu: CPU): void
    {
        const memory = cpu.memory.store();
        this._memory.splice(0, this._memory.length);

        for (const key in memory) {
            if (memory.hasOwnProperty(key)) {
                this._memory.push({
                    address: key,
                    value: memory[key],
                    edit: false,
                    editAddress: '',
                    editValue: '',
                });
            }
        }
    }
}
