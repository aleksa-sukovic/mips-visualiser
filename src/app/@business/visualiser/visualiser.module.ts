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
import { MipsComponent } from './components/mips/mips.component';
import { RegistersService } from './services/registers.service';
import { MemoryService } from './services/memory.service';
import { SvgService } from './services/svg.service';
import { TooltipService } from './services/tooltip-service';
import { TooltipComponent } from './components/tooltip/tooltip.component';

@NgModule({
    declarations: [
        PlayerComponent,
        InstructionContainerComponent,
        RegistersComponent,
        RegisterItemComponent,
        MemoryComponent,
        MemoryItemComponent,
        MipsComponent,
        TooltipComponent,
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
        MipsComponent,
        TooltipComponent,
    ],
    providers: [
        CPUService,
        RegistersService,
        MemoryService,
        SvgService,
        TooltipService,
    ]
})
export class VisualiserModule
{
    //
}
