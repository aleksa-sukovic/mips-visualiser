import { Component, EventEmitter, Output } from '@angular/core';
import { faPlay, faForward } from '@fortawesome/free-solid-svg-icons';

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
    @Output() backward = new EventEmitter();

    public constructor ()
    {
        //
    }

    public handleSimulateClick ()
    {
        this.simulate.emit();
    }

    public handleBackwardClick ()
    {
        this.backward.emit();
    }

    public handleForwardClick ()
    {
        this.forward.emit();
    }
}
