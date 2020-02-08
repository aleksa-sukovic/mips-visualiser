import { Component, OnInit } from '@angular/core';
import { SVG } from '@svgdotjs/svg.js';
import { SvgService } from '../../services/svg.service';

@Component({
    selector: 'app-mips',
    templateUrl: './mips.component.html',
    styleUrls: ['./mips.component.scss']
})
export class MipsComponent implements OnInit
{
    public svg: any;

    public constructor (private svgService: SvgService)
    {
        //
    }

    public ngOnInit (): void
    {
        const elements = document.querySelectorAll('text,path,circle,g,rect');

        this.addEventListeners(elements);
        this.svgService.elements = elements;

        this.svgService.visualiseClock(null);
    }

    public addEventListeners (nodes: any): void
    {
        for (let i = 0; i < nodes.length; i++) {
            nodes.item(i).addEventListener('mousemove', this.handleElementMouseMove.bind(this));
        }
    }

    public handleElementMouseMove ($event): void
    {
        const element = $event.currentTarget;

        switch (element.tagName) {
            case 'path':
                SVG(element).attr({ stroke: '#f30' });
                break;
            case 'text':
                SVG(element).attr({ fill: '#f30' });
                break;
            case 'rect':
                SVG(element).attr({ fill: '#f30' });
                break;
            case 'circle':
                SVG(element).attr({ fill: '#f30' });
                break;
        }
    }
}
