import { Injectable } from '@angular/core';
import { CPU } from '../../mips/cpu/cpu';
import { BinaryEncoder } from '../../mips/library/binary-encoder/binary-encoder';
import { CPUService } from './cpu.services';
import config from '../../mips/library/config/config';
import Config from '../../mips/library/config/config';

@Injectable({
    providedIn: 'root',
})
export class MemoryService
{
    protected _cpu: CPU;
    protected _encoder: BinaryEncoder;
    protected _memory: any[];

    public constructor (private cpuService: CPUService)
    {
        this._cpu = cpuService.cpu;
        this._encoder = new BinaryEncoder();
        this._memory = [];

        this.refreshMemory();
    }

    public updateMemory (memoryItem: any): void
    {
        this.deleteFromMemory(memoryItem.id);

        this._cpu.memory.set(
            this._encoder.binary(parseInt(memoryItem.editAddress, 10) || 0, Config.get().word_length),
            this._encoder.binary(parseInt(memoryItem.editValue, 10) || 0, Config.get().word_length)
        );

        this.refreshMemory();
    }

    public deleteFromMemory (key: string): void
    {
        this._cpu.memory.destroy(key);

        this.refreshMemory();
    }

    public memory (): any[]
    {
        return this._memory;
    }

    public refreshMemory (): void
    {
        this._memory.splice(0, this._memory.length);

        for (const address of this.cpuService.cpu.memory.addresses()) {
            this._memory.push({
                id: address,
                address: this._encoder.number(address) || 1,
                value: this._encoder.number(this.cpuService.cpu.memory.get(address)),
                edit: false,
                editAddress: this._encoder.number(address) || 1,
                editValue: this._encoder.number(this.cpuService.cpu.memory.get(address)),
            });
        }
    }
}
