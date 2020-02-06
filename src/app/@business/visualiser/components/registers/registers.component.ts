import { Component } from '@angular/core';
import { CPUService } from '../../services/cpu.services';
import { BinaryEncoder } from '../../../mips/library/binary-encoder/binary-encoder';

@Component({
    selector: 'app-registers',
    templateUrl: './registers.component.html',
    styleUrls: ['./registers.component.scss']
})
export class RegistersComponent
{
    public registers: any[];

    protected encoder: BinaryEncoder;

    public constructor (private cpuService: CPUService)
    {
        this.encoder = new BinaryEncoder();
        this.registers = this.cpuService.registers();
    }

    public handleRegisterEdit (register)
    {
        if (register.editValue) {
            this.cpuService.updateRegister(register.id, register.editValue);
        }

        register.edit = false;
    }
}
