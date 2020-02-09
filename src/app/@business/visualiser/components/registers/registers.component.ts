import { Component } from '@angular/core';
import { BinaryEncoder } from '../../../mips/library/binary-encoder/binary-encoder';
import { RegistersService } from '../../services/registers.service';

@Component({
    selector: 'app-registers',
    templateUrl: './registers.component.html',
    styleUrls: ['./registers.component.scss']
})
export class RegistersComponent
{
    public registers: any[];

    protected encoder: BinaryEncoder;

    public constructor (private registersService: RegistersService)
    {
        this.encoder = new BinaryEncoder();
        this.registers = this.registersService.registers();
    }

    public handleRegisterEdit (register)
    {
        this.registersService.updateRegister(register.id, register.editValue);

        register.edit = false;
    }

    public handleResetClick (): void
    {

    }
}
