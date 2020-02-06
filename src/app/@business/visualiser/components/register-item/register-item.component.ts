import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCheck, faEdit, faWindowClose } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-register-item',
    templateUrl: './register-item.component.html',
    styleUrls: ['./register-item.component.scss']
})
export class RegisterItemComponent
{
    @Input() register: any;
    @Output() submit = new EventEmitter();
    public faEdit = faEdit;
    public faClose = faWindowClose;
    public faCheck = faCheck;

    public constructor ()
    {
        this.register = {};
    }

    public handleFormSubmit (register)
    {
        this.submit.emit(register);
        register.edit = false;
    }

    public handleEditClick (register)
    {
        register.edit = true;
        register.editValue = register.value;
        setTimeout(() => {
            document.getElementById(`register_${register.alias}`).focus();
        });
    }

    public handleCloseClick ($event, register)
    {
        register.edit = false;
        $event.stopPropagation();
    }
}
