import { Component, OnInit } from '@angular/core';
import { SvgService } from '../../services/svg.service';
import { CPUService } from '../../services/cpu.services';
import { TooltipService } from '../../services/tooltip-service';

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
    }

    public handleMouseMove ($event)
    {
        this.svgService.mouseMove($event);
        this.tooltipService.mouseMove($event);
    }
}
