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

    protected _elements: any[];

    public constructor ()
    {
        this._elements = [];
    }

    public visualiseClock (clock: Clock)
    {
        //
    }

    protected handleElementHover (element)
    {
        console.log(element);
    }

    public set elements (value)
    {
        this._elements = value;
        this._elements.forEach(it => it.addEventListener('mousemove', event => this.handleElementHover(event.currentTarget)));
    }
}
