import { Component, EventEmitter, Output } from '@angular/core';
import { TooltipService } from '../../services/tooltip-service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-instruction-container',
    templateUrl: './instruction-container.component.html',
    styleUrls: ['./instruction-container.component.scss']
})
export class InstructionContainerComponent
{
    public availableInstructions = [
        { alias: 'add', example: 'add $1, $2, $3' },
        { alias: 'addi', example: 'addi $1, $2, 250' },
        { alias: 'slt', example: 'slt $1, $2, $3' },
        { alias: 'sub', example: 'sub $1, $2, $3' },
        { alias: 'beq', example: 'beq $1, $2, 128' },
        { alias: 'bne', example: 'bne $2, $3, 256' },
        { alias: 'lw', example: 'lw $1, 516($3)' },
        { alias: 'sw', example: 'sw $2, 0($1)' },
    ];
    public instructionText: string;
    @Output() loaded = new EventEmitter<string>();

    public constructor (private tooltipService: TooltipService, private toastrService: ToastrService)
    {
        //
    }

    public handleMouseMove ($event)
    {
        this.tooltipService.mouseMove($event);
    }

    public handleFormSubmit ()
    {
        if (!this.instructionText) {
            this.toastrService.error('Please enter instruction to simulate');
            return;
        }

        this.loaded.emit(this.instructionText);
    }
}
