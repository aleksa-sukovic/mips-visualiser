import { Component } from '@angular/core';
import { CPUService } from '../../services/cpu.services';
import { SvgService } from '../../services/svg.service';
import { RegistersService } from '../../services/registers.service';
import { MemoryService } from '../../services/memory.service';

@Component({
    selector: 'app-visualiser-controller',
    templateUrl: './visualiser-controller.html',
    styleUrls: ['./visualiser-controller.component.scss']
})
export class VisualiserControllerComponent
{
    public constructor (
        private cpuService: CPUService,
        private registersService: RegistersService,
        private memoryService: MemoryService,
        private svgService: SvgService,
    ) {
        //
    }

    public handleInstructionLoad (instruction): void
    {
        this.cpuService.load(instruction);
    }

    public handleSimulateClick ()
    {
        console.log('Simulate.');
    }

    public handleForwardClick ()
    {
        this.cpuService.next();
        this.registersService.refreshRegisters();
        this.memoryService.refreshMemory();
        this.svgService.visualiseClock(this.cpuService.clock);
    }
}
