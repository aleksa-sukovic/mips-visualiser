import { Component } from '@angular/core';
import { CPUService } from '../../services/cpu.services';
import { SvgService } from '../../services/svg.service';
import { RegistersService } from '../../services/registers.service';
import { MemoryService } from '../../services/memory.service';
import { ToastrService } from 'ngx-toastr';

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
        private toastrService: ToastrService,
    ) {
        //
    }

    public handleInstructionLoad (instruction): void
    {
        try {
            this.cpuService.load(instruction);
            this.toastrService.success('Instruction loaded');
        } catch (e) {
            this.toastrService.error('Instruction is either not valid or unsupported');
        }
    }

    public handleSimulateClick ()
    {
        console.log('Simulate.');
    }

    public handleReset (): void
    {
        this.cpuService.cpu.reset();
        this.registersService.refreshRegisters();
        this.memoryService.refreshMemory();
        this.svgService.reset();
    }

    public handleForwardClick ()
    {
        this.cpuService.next();
        this.registersService.refreshRegisters();
        this.memoryService.refreshMemory();
        this.svgService.visualiseClock(this.cpuService.clock);

        if (!this.cpuService.executing) {
            this.svgService.reset();
            this.toastrService.success('Successfully executed instruction');
        }
    }
}
