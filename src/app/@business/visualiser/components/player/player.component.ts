import { Component, EventEmitter, Output } from '@angular/core';
import { faPlay, faForward } from '@fortawesome/free-solid-svg-icons';
import { TooltipService } from '../../services/tooltip-service';
import { CPUService } from '../../services/cpu.services';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss']
})
export class PlayerComponent
{
    public faForward = faForward;
    public faPlay = faPlay;

    @Output() simulate = new EventEmitter();
    @Output() forward = new EventEmitter();

    public constructor (private tooltipService: TooltipService, public cpuService: CPUService)
    {
        //
    }

    public handleMouseMove ($event): void
    {
        this.tooltipService.mouseMove($event);
    }

    public handleExecuteClick ()
    {
        this.simulate.emit();
    }

    public handleForwardClick ()
    {
        this.forward.emit();
    }
}
