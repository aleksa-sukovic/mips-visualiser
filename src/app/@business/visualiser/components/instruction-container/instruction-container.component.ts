import { Component } from '@angular/core';

@Component({
    selector: 'app-instruction-container',
    templateUrl: './instruction-container.component.html',
    styleUrls: ['./instruction-container.component.scss']
})
export class InstructionContainerComponent
{
    public availableInstructions = [
        { alias: 'add', example: 'add $1, $2, $3' },
        { alias: 'addi', example: 'addi $1, $2, 1024' },
        { alias: 'sub', example: 'sub $1, $2, $3' },
        { alias: 'beq', example: 'beq $1, $2, 128' },
        { alias: 'bne', example: 'bne $2, $3, 256' },
        { alias: 'lw', example: 'lw $1, 516($3)' },
        { alias: 'sw', example: 'sw $2, 0($1)' },
    ];
    public instructionText: string;

    public constructor ()
    {
        //
    }

    public handleFormSubmit ()
    {
        if (!this.instructionText) {
            return;
        }

        console.log(this.instructionText);
    }
}
