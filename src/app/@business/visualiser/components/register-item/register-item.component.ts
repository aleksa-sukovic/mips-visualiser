import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCheck, faEdit, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { TooltipService } from '../../services/tooltip-service';

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

    public constructor (private tooltipService: TooltipService)
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
        if (register.editable) {
            register.edit = true;
            register.editValue = register.value;
            setTimeout(() => {
                const element = document.getElementById(`register_${register.alias}`);

                element.focus();
                (element as HTMLInputElement).select();
            });
        }
    }

    public handleCloseClick ($event, register)
    {
        register.edit = false;
        $event.stopPropagation();
    }

    public handleMouseMove ($event): void
    {
        this.tooltipService.mouseMove($event, false);
    }
}
