import { Injectable } from '@angular/core';
import { Clock } from '../../mips/clock/clock';
import Anime from 'animejs/lib/anime.es.js';
import config, {
    findClockConfig,
    findTooltipForElement, isElementArrow,
    isElementFocused,
    isElementTextNode
} from '../../mips/library/config';
import { NullClock } from '../../mips/clock/Null/NullClock';

@Injectable({
    providedIn: 'root',
})
export class SvgService
{
    protected _elements = [];
    protected _activeClock: Clock = new NullClock();
    protected _emphasizedIds: any[] = [];

    public visualiseClock (clock: Clock)
    {
        this._activeClock = clock;
        const clockConfig = findClockConfig(clock);

        // Reduce opacity of all elements.
        Anime({ targets: this._elements, opacity: config.visual.inactiveOpacity });

        // Fade in focused elements.
        Anime({ targets: this.findElements(clockConfig.focus), keyframes: config.visual.opacitySteps.reverse(), duration: config.visual.animationDuration });
    }

    public mouseMove ($event): void
    {
        const tooltip = findTooltipForElement($event.target, this._activeClock);
        this.deEmphasize(this.findElements(this._emphasizedIds));

        if (tooltip) {
            this.emphasize(this.findElements(tooltip.ids));
            this._emphasizedIds = tooltip.ids;
        }
    }

    public emphasize (elements): void
    {
        elements.forEach(element => {
            if (isElementTextNode(element)) {
                Anime({ targets: element, fill: config.visual.emphasizeTextColor });
            } else if (isElementArrow(element)) {
                Anime({ targets: element, fill: config.visual.emphasizeColor });
            } else if (element.tagName === 'path') {
                Anime({ targets: element, stroke: config.visual.emphasizeColor });
            } else {
                Anime({ targets: element, fill: config.visual.emphasizeColor });
            }
        });
    }

    public deEmphasize (elements): void
    {
        elements.forEach(element => {
            if (isElementTextNode(element)) {
                Anime({ targets: element, fill: config.visual.deEmphasizeTextColor });
            } else if (isElementArrow(element)) {
                Anime({ targets: element, fill: config.visual.deEmphasizeColor });
            } else if (element.tagName === 'path') {
                Anime({ targets: element, stroke: config.visual.deEmphasizeColor });
            } else {
                Anime({ targets: element, fill: config.visual.deEmphasizeColor });
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
        Anime({ targets: this._elements, keyframes: config.visual.opacitySteps.reverse(), duration: config.visual.animationDuration });
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
