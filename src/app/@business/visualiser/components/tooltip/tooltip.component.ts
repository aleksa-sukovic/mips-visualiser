import { Component, OnInit } from '@angular/core';
import { TooltipService } from '../../services/tooltip-service';

@Component({
    selector: 'app-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent
{
    public opacity = 1;

    public constructor (public tooltipService: TooltipService)
    {
        //
    }

    public handleMouseMove (): void
    {
        this.opacity = 0;
    }
}
