import { Component, OnInit } from '@angular/core';
import { SvgService } from '../../services/svg.service';
import { CPUService } from '../../services/cpu.services';
import { InstructionFactory } from '../../../mips/instruction/factories/instruction-factory';
import { TooltipService } from '../../services/tooltip-service';

@Component({
    selector: 'app-mips',
    templateUrl: './mips.component.html',
    styleUrls: ['./mips.component.scss']
})
export class MipsComponent implements OnInit
{
    public svg: any;

    public constructor (private svgService: SvgService, private cpuService: CPUService, private tooltipService: TooltipService)
    {
        //
    }

    public ngOnInit (): void
    {
        // Initialize SVG animations service.
        this.svgService.elements = document.querySelectorAll('text,path,circle,g,rect');

        // Prepare processor to simulate instruction.
        this.cpuService.cpu.simulate(InstructionFactory.fromSymbolic('add $1, $2, $3'));

        // Visualise first clock, testing.
        const clock = this.cpuService.cpu.currentClock();
        this.svgService.visualiseClock(clock);
    }

    public handleMouseMove ($event)
    {
        this.svgService.mouseMove($event);
        this.tooltipService.mouseMove($event);
    }
}
