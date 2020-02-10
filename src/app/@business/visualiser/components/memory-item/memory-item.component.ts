import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCheck, faTrash, } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-memory-item',
    templateUrl: './memory-item.component.html',
    styleUrls: ['./memory-item.component.scss']
})
export class MemoryItemComponent
{
    @Input() item;
    @Output() submit = new EventEmitter();
    @Output() delete = new EventEmitter();
    public faCheck = faCheck;
    public faTrash = faTrash;

    public constructor ()
    {
        //
    }

    public handleFormSubmit (item): void
    {
        this.submit.emit(item);
        item.edit = false;
    }

    public handleEditClick (item): void
    {
        item.edit = true;
        setTimeout(() => {
            const element = document.getElementById(`item_${item.id}_value`);

            element.focus();
            (element as HTMLInputElement).select();
        });
    }

    public handleItemDelete (item): void
    {
        this.delete.emit(item);
    }
}
