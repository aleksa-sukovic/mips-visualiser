import { NgModule } from '@angular/core';
import { VisualiserRouting } from './visualiser.routing';
import { SharedModule } from '../../@shared/shared.modules';
import { PlayerComponent } from './components/player/player.component';

@NgModule({
    declarations: [
        PlayerComponent,
    ],
    imports: [
        VisualiserRouting,

        SharedModule,
    ],
    exports: [
        PlayerComponent,
        //
    ],
    providers: [
        //
    ]
})
export class VisualiserModule
{
    //
}
