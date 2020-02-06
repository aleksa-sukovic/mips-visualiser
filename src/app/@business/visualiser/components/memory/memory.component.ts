import { Component, OnInit } from '@angular/core';
import { CPUService } from '../../services/cpu.services';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-memory',
    templateUrl: './memory.component.html',
    styleUrls: ['./memory.component.scss']
})
export class MemoryComponent
{
    public memory: any[];
    public faPlus = faPlus;

    public constructor (private cpuService: CPUService)
    {
        this.memory = cpuService.memory();
    }

    public handleMemoryEdit (memoryItem): void
    {
        this.cpuService.updateMemory(memoryItem);
    }

    public handleMemoryItemDelete (memoryItem): void
    {
        this.cpuService.deleteFromMemory(memoryItem.id);
    }

    public handleAddButtonClick (): void
    {
        if (!this.memory.find(it => it.id === 'new')) {
            this.memory.push({
                id: 'new',
                address: 1,
                value: 0,
                edit: true,
                editValue: 0,
                editAddress: 1,
            });
            setTimeout(() => document.getElementById('item_new_address').focus());
        }
    }
}
