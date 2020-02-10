import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faPlay, faForward } from '@fortawesome/free-solid-svg-icons';
import { TooltipService } from '../../services/tooltip-service';
import { CPUService } from '../../services/cpu.services';
import { ToastrService } from 'ngx-toastr';

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

    private _animationSpeed = 1000;

    public constructor (
        private tooltipService: TooltipService,
        public cpuService: CPUService,
        private toastrService: ToastrService
    ) {
        //
    }

    public handleMouseMove ($event): void
    {
        this.tooltipService.mouseMove($event);
    }

    public handleAnimationSpeedChange ($element): void
    {
        this._animationSpeed = parseFloat($element.value) * 1000;
        this.animationChange.emit(this._animationSpeed);
    }

    public handleExecuteClick ()
    {
        if (!this.cpuService.loaded) {
            this.toastrService.warning('Please load instruction.');

            return;
        }

        this.simulate.emit();
    }

    public handleForwardClick ()
    {
        if (!this.cpuService.loaded) {
            this.toastrService.warning('Please load instruction.');

            return;
        }

        this.forward.emit();
    }
}
