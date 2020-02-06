import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCheck, faMarker, faPen, faTrash, faWindowClose } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-memory-item',
    templateUrl: './memory-item.component.html',
    styleUrls: ['./memory-item.component.scss']
})
export class MemoryItemComponent
{
    @Input() item;
    @Output() submit = new EventEmitter();
    @Output() onDelete = new EventEmitter();
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
            document.getElementById(`item_${item.id}_value`).focus();
        });
    }

    public handleItemDelete (item): void
    {
        this.onDelete.emit(item);
    }
}
