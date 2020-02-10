import { Component, OnInit } from '@angular/core';
import { SvgService } from '../../services/svg.service';
import { CPUService } from '../../services/cpu.services';
import { TooltipService } from '../../services/tooltip-service';
import { Clock3 } from '../../../mips/clock/3/clock-3';
import { Clock4 } from '../../../mips/clock/4/clock-4';

@Component({
    selector: 'app-mips',
    templateUrl: './mips.component.html',
    styleUrls: ['./mips.component.scss']
})
export class MipsComponent implements OnInit
{
    public svg: any;

    public constructor (
        private svgService: SvgService,
        private cpuService: CPUService,
        private tooltipService: TooltipService
    ) {
        //
    }

    public ngOnInit (): void
    {
        this.svgService.elements = document.querySelectorAll('text,path,circle,g,rect');

        this.svgService.visualiseClock(new Clock4());
    }

    public handleMouseMove ($event)
    {
        this.svgService.mouseMove($event);
        this.tooltipService.mouseMove($event);
    }
}
