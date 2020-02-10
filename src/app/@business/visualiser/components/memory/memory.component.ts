import { Component } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { MemoryService } from '../../services/memory.service';

@Component({
    selector: 'app-memory',
    templateUrl: './memory.component.html',
    styleUrls: ['./memory.component.scss']
})
export class MemoryComponent
{
    public memory: any[];
    public faPlus = faPlus;

    public constructor (private memoryService: MemoryService)
    {
        this.memory = memoryService.memory();
    }

    public handleMemoryEdit (memoryItem): void
    {
        this.memoryService.updateMemory(memoryItem);
    }

    public handleMemoryItemDelete (memoryItem): void
    {
        this.memoryService.deleteFromMemory(memoryItem.id);
    }

    public handleAddButtonClick (): void
    {
        const addNewItemInputVisible = this.memory.find(it => it.id === 'new');

        if (addNewItemInputVisible) {
            return;
        }

        this.memory.push({
            id: 'new',
            address: 1,
            value: 0,
            edit: true,
            editValue: 0,
            editAddress: 1,
        });
        setTimeout(() => {
            const element = document.getElementById('item_new_address');

            element.focus();
            (element as HTMLInputElement).select();
        });
    }
}
