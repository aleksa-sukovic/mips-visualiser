import { Injectable } from '@angular/core';
import { Clock } from '../../mips/clock/clock';
import Anime from 'animejs/lib/anime.es.js';
import config from '../../mips/library/config';

@Injectable({
    providedIn: 'root',
})
export class SvgService
{
    public animationSpeed = 400;

    protected _elements: NodeListOf<Element>;

    public constructor ()
    {
        //
    }

    public visualiseClock (clock: Clock)
    {
        const cfg = config.visualisations.find(it => it.id === clock.id());

        console.log(cfg.focus);
        Anime({ targets: this._elements, opacity: 0.2 });
        Anime({ targets: this.findElements(cfg.focus), opacity: 1 });
    }

    protected handleElementHover (element)
    {
        console.log(element);
    }

    public set elements (values: NodeListOf<Element>)
    {
        this._elements = values;
        this._elements.forEach(it => it.addEventListener('mousemove', event => this.handleElementHover(event.currentTarget)));
    }

    protected findElements (ids: any[])
    {
        const selector = ids.map(it => {
            return parseInt(it, 10) ? `[id="${it}"]` : `#${it}`;
        }).join(',');

        return document.querySelectorAll(selector);
    }
}
