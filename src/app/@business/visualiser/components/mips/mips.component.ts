import { Component, OnInit } from '@angular/core';
import { SvgService } from '../../services/svg.service';
import { CPUService } from '../../services/cpu.services';
import { InstructionFactory } from '../../../mips/instruction/factories/instruction-factory';

@Component({
    selector: 'app-mips',
    templateUrl: './mips.component.html',
    styleUrls: ['./mips.component.scss']
})
export class MipsComponent implements OnInit
{
    public svg: any;

    public constructor (private svgService: SvgService, private cpuService: CPUService)
    {
        //
    }

    public ngOnInit (): void
    {
        this.svgService.elements = document.querySelectorAll('text,path,circle,g,rect');

        this.cpuService.cpu.simulate(InstructionFactory.fromSymbolic('add $1, $2, $3'));
        const clock = this.cpuService.cpu.currentClock();
        if (clock) {
            this.svgService.visualiseClock(clock);
        }
    }
}
