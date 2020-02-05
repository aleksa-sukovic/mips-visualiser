import { Component } from '@angular/core';

@Component({
    selector: 'app-visualiser-controller',
    templateUrl: './visualiser-controller.html',
    styleUrls: ['./visualiser-controller.component.scss']
})
export class VisualiserControllerComponent
{
    public constructor ()
    {
        //
    }

    public handleSimulateClick ()
    {
        console.log('Simulate.');
    }

    public handleBackwardClick ()
    {
        console.log('Backward.');
    }

    public handleForwardClick ()
    {
        console.log('Forward.');
    }
}
