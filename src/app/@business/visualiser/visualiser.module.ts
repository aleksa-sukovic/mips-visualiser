import { NgModule } from '@angular/core';
import { VisualiserRouting } from './visualiser.routing';
import { SharedModule } from '../../@shared/shared.modules';
import { PlayerComponent } from './components/player/player.component';
import { InstructionContainerComponent } from './components/instruction-container/instruction-container.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistersComponent } from './components/registers/registers.component';
import { CPUService } from './services/cpu.services';
import { RegisterItemComponent } from './components/register-item/register-item.component';
import { MemoryComponent } from './components/memory/memory.component';
import { MemoryItemComponent } from './components/memory-item/memory-item.component';

@NgModule({
    declarations: [
        PlayerComponent,
        InstructionContainerComponent,
        RegistersComponent,
        RegisterItemComponent,
        MemoryComponent,
        MemoryItemComponent,
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
        RegistersComponent,
        MemoryComponent,
    ],
    providers: [
        CPUService,
    ]
})
export class VisualiserModule
{
    //
}
