import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TooltipService } from '../../services/tooltip-service';

@Component({
    selector: 'app-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class TooltipComponent
{
    public constructor (public tooltipService: TooltipService)
    {
        //
    }
}
