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
    @Output() animationChange = new EventEmitter();

    public _animationSpeed = 500;

    public constructor (
        private tooltipService: TooltipService,
        public cpuService: CPUService,
    ) {
        //
    }

    public handleMouseMove ($event): void
    {
        this.tooltipService.mouseMove($event);
    }

    public handleAnimationSpeedChange ($element): void
    {
        this._animationSpeed = parseFloat($element.value) * 1000 * 2;
        this.animationChange.emit(this._animationSpeed);
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
