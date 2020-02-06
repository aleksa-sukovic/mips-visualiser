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

    public handleAddButtonClick (): void
    {
        this.memory.push({
            address: '0',
            value: '0',
            edit: true,
            editValue: '0',
            editAddress: '0',
        });
    }
}
