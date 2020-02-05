import { Component } from '@angular/core';
import { CPUService } from '../../services/cpu.services';
import { BinaryEncoder } from '../../../mips/library/binary-encoder/binary-encoder';
import { faEdit, faWindowClose } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-registers',
    templateUrl: './registers.component.html',
    styleUrls: ['./registers.component.scss']
})
export class RegistersComponent
{
    public registers: any[];
    public faEdit = faEdit;
    public faClose = faWindowClose;

    protected encoder: BinaryEncoder;

    public constructor (private cpuService: CPUService)
    {
        this.encoder = new BinaryEncoder();
        this.initializeRegisters();
    }

    protected initializeRegisters ()
    {
        this.registers = this.cpuService.registers().map(it => {
            return {
                id: it.binary,
                alias: it.aliases.join(' / '),
                number: this.encoder.unsignedNumber(it.binary) || it.binary,
                value: this.encoder.number(it.value),
                edit: false,
                editValue: '',
            };
        });
    }

    public handleEditClick (register)
    {
        register.edit = true;
    }

    public handleInputChange ($event, register)
    {
        register.editValue = $event.target.value;
    }

    public handleRegisterEditClose (register)
    {
        if (register.editValue) {
            this.cpuService.updateRegister(register.id, register.editValue);
            this.initializeRegisters();
        }

        register.edit = false;
    }
}
