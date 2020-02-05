import { NgModule } from '@angular/core';
import { VisualiserRouting } from './visualiser.routing';
import { SharedModule } from '../../@shared/shared.modules';
import { PlayerComponent } from './components/player/player.component';
import { InstructionContainerComponent } from './components/instruction-container/instruction-container.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        PlayerComponent,
        InstructionContainerComponent,
    ],
    imports: [
        VisualiserRouting,

        FormsModule,

        SharedModule,
        CommonModule,
        ReactiveFormsModule,
    ],
    exports: [
        PlayerComponent,
        InstructionContainerComponent,
    ],
    providers: [
        //
    ]
})
export class VisualiserModule
{
    //
}
