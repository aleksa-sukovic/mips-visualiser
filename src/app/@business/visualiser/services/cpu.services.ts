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

    public constructor ()
    {
        this.cpu = new CPU();
        this.encoder = new BinaryEncoder();
    }

    public updateRegister (id: string, value: string)
    {
        this.cpu.register(id).value = this.encoder.binary(parseInt(value, 10), config.word_length);
    }

    public registers ()
    {
        return config.registers;
    }
}
