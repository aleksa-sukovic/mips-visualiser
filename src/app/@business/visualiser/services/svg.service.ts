import { Injectable } from '@angular/core';
import { Clock } from '../../mips/clock/clock';
import Anime from 'animejs/lib/anime.es.js';
import { NullClock } from '../../mips/clock/Null/NullClock';
import Config from '../../mips/library/config/config';

@Injectable({
    providedIn: 'root',
})
export class SvgService
{
    protected _elements = [];
    protected _activeClock: Clock = new NullClock();
    protected _emphasizedIds: any[] = [];
    protected _fadeInKeyframes = Array.from(Config.get().visual.opacitySteps).reverse();
    protected _fadeOutKeyframes = Config.get().visual.opacitySteps;
    protected _animationDuration = Config.get().visual.animationDuration;

    public visualiseClock (clock: Clock)
    {
        this._activeClock = clock;
        const clockConfig = Config.clockConfig(clock);

        // Reduce opacity of all elements.
        Anime({ targets: this._elements, keyframes: this._fadeOutKeyframes, duration: this._animationDuration });

        // Fade in focused elements.
        Anime({ targets: this.findElements(clockConfig.focus), keyframes: this._fadeInKeyframes, duration: this._animationDuration });
    }

    public mouseMove ($event): void
    {
        const tooltip = Config.elementTooltip($event.target, this._activeClock);
        this.deEmphasize(this.findElements(this._emphasizedIds));

        if (tooltip) {
            this.emphasize(this.findElements(tooltip.ids.concat(tooltip.additional)));
            this._emphasizedIds = tooltip.ids.concat(tooltip.additional);
        }
    }

    public emphasize (elements): void
    {
        elements.forEach(element => {
            if (Config.elementType(element) === Config.ELEMENT_TEXT) {
                Anime({ targets: element, fill: Config.get().visual.emphasizeTextColor });
            } else if (Config.elementType(element) === Config.ELEMENT_LABEL) {
                Anime({ targets: element, fill: Config.get().visual.emphasizeLabelColor });
            }  else if (Config.elementType(element) === Config.ELEMENT_COMPONENT) {
                Anime({ targets: element, fill: Config.get().visual.emphasizeComponentColor });
            } else if (Config.elementType(element) === Config.ELEMENT_ARROW) {
                Anime({ targets: element, fill: Config.get().visual.emphasizeColor });
            } else if (Config.elementType(element) === Config.ELEMENT_PATH) {
                Anime({ targets: element, stroke: Config.get().visual.emphasizeColor });
            } else {
                Anime({ targets: element, fill: Config.get().visual.emphasizeColor });
            }
        });
    }

    public deEmphasize (elements): void
    {
        elements.forEach(element => {
            if (Config.elementType(element) === Config.ELEMENT_TEXT) {
                Anime({ targets: element, fill: Config.get().visual.deEmphasizeTextColor });
            } else if (Config.elementType(element) === Config.ELEMENT_LABEL) {
                Anime({ targets: element, fill: Config.get().visual.deEmphasizeLabelColor });
            } else if (Config.elementType(element) === Config.ELEMENT_COMPONENT) {
                Anime({ targets: element, fill: Config.get().visual.deEmphasizeComponentColor });
            } else if (Config.elementType(element) === Config.ELEMENT_ARROW) {
                Anime({ targets: element, fill: Config.get().visual.deEmphasizeColor });
            } else if (Config.elementType(element) === Config.ELEMENT_PATH) {
                Anime({ targets: element, stroke: Config.get().visual.deEmphasizeColor });
            } else {
                Anime({ targets: element, fill: Config.get().visual.deEmphasizeColor });
            }
        });
    }

    public set elements (values: NodeListOf<Element>)
    {
        this._elements.splice(0, this._elements.length);

        values.forEach(it => this._elements.push(it));

        this.deEmphasize(this._elements);
    }

    public reset (): void
    {
        this.deEmphasize(this._elements);
        this._emphasizedIds = [];
        this._activeClock = new NullClock();

        // Fade in all elements
        Anime({ targets: this._elements, duration: this._animationDuration, keyframes: this._fadeInKeyframes });
    }

    public set animationDuration (value)
    {
        this._animationDuration = value;
    }

    public get animationDuration ()
    {
        return this._animationDuration;
    }

    protected findElements (ids: any[]): any[]
    {
        if (ids.length === 0) return [];
        const result = [];

        document.querySelectorAll(ids.map(it => {
            return parseInt(it, 10) ? `[id="${it}"]` : `#${it}`;
        }).join(',')).forEach(it => result.push(it));

        return result;
    }
}
