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

    public updateMemory (memoryItem: any): void
    {
        this.cpu.memory.destroy(memoryItem.id);
        this.cpu.memory.set(
            this.encoder.binary(parseInt(memoryItem.editAddress, 10), config.word_length),
            this.encoder.binary(parseInt(memoryItem.editValue, 10), config.word_length)
        );
        this.initializeMemory(this.cpu);
    }

    public deleteFromMemory (key: string): void
    {
        this.cpu.memory.destroy(key);
        this.initializeMemory(this.cpu)
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
        this._memory.splice(0, this._memory.length);

        for (const address of cpu.memory.addresses()) {
            this._memory.push({
                id: address,
                address: this.encoder.number(address) || 1,
                value: this.encoder.number(cpu.memory.get(address)),
                edit: false,
                editAddress: this.encoder.number(address) || 1,
                editValue: this.encoder.number(cpu.memory.get(address)),
            });
        }
    }
}
