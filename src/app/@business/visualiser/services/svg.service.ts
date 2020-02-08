import { Injectable } from '@angular/core';
import { Clock } from '../../mips/clock/clock';
import { SVG, SVGTypeMapping, Timeline } from '@svgdotjs/svg.js';
import config from '../../mips/library/config';

@Injectable({
    providedIn: 'root',
})
export class SvgService
{
    public animationSpeed = 400;

    protected _elements: SVGTypeMapping<Element>[];

    public constructor ()
    {
        this._elements = [];
    }

    public visualiseClock (clock: Clock)
    {
        this.fadeOutElement();

        this.animateMany(this.makeElements(config.clock_1.focus), element => {
            element
                .animate(this.animationSpeed, 500, 'absolute')
                .attr({ fill: '#00FF05' });
        });

        // for (const active of config.clock_1.focus) {
        //     const element = SVG(document.querySelector('#' + active));
        //
        //     element.attr({ fill: '#f30' });
        // }
    }

    protected fadeOutElement (): void
    {
        this.animateMany(this._elements, element => {
            element
                .animate(this.animationSpeed, 500, 'absolute')
                .attr({ opacity: 0.3 });
        });
    }

    protected animateMany (elements, elementAnimator: (element) => void): void
    {
        const timeline = new Timeline();

        for (const element of elements) {
            element.timeline(timeline);
            elementAnimator(element);
        }

        timeline.play();
    }

    public set elements (elements: NodeListOf<Element>)
    {
        this._elements = [];
        for (let i = 0; i < elements.length; i++) {
            this._elements.push(SVG(elements[i]));
        }
    }

    private makeElements (ids: any[]): SVGTypeMapping<Element>[]
    {
        const result = [];
        const elements = document.querySelectorAll(ids.map(it => '#' + it).join(','));
        console.log(elements);

        for (let i = 0; i < elements.length; i++) {
            let element = SVG(elements[i]);
            result.push(element);
        }

        return result;
    }
}
