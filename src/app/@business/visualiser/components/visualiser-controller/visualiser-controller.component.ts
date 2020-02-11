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
    private _interval: any = null;
    public _intervalSpeed = 0;

    public constructor (
        private cpuService: CPUService,
        private registersService: RegistersService,
        private memoryService: MemoryService,
        private svgService: SvgService,
        private toastrService: ToastrService,
    ) {
        this._intervalSpeed  = this.svgService.animationDuration;
    }

    public handleInstructionLoad (instruction): void
    {
        try {
            this.cpuService.load(instruction);
            this.registersService.refreshRegisters();
            this.memoryService.refreshMemory();
            this.toastrService.success('Instruction loaded');
            this.svgService.reset();
            this.scrollTo('MIPS');
        } catch (e) {
            this.toastrService.error('Instruction is either not valid or unsupported');
        }
    }

    public handleSimulateClick ()
    {
        if (!this.cpuService.loaded) {
            this.toastrService.warning('Please load instruction.');
            this.scrollTo('HEADER');
            return;
        }

        this.handleForwardClick();
        this._interval = setInterval(() => this.handleForwardClick(), this._intervalSpeed);
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
        // Check if instruction is loaded
        if (!this.cpuService.loaded) {
            this.toastrService.warning('Please load instruction.');
            this.scrollTo('HEADER');
            return;
        }

        // Execute next clock
        this.cpuService.next();
        this.registersService.refreshRegisters();
        this.memoryService.refreshMemory();
        this.svgService.visualiseClock(this.cpuService.clock);

        // Cleanup instruction execution
        if (!this.cpuService.executing) {
            if (this._interval) clearInterval(this._interval);

            this.toastrService.success('Successfully executed instruction');
        }
    }

    public handleAnimationSpeedChange (speed): void
    {
        this.svgService.animationDuration = speed;
        this._intervalSpeed = speed * 2;
    }

    protected scrollTo (id: string): void
    {
        const element = document.getElementById(id);

        if (element) {
            (element as HTMLElement).scrollIntoView({ behavior: 'smooth' });
        }
    }
}
