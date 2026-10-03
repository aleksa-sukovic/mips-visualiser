import { Injectable } from "@angular/core";
import { Clock } from "../../mips/clock/clock";
import { animate } from "animejs";
import { NullClock } from "../../mips/clock/Null/NullClock";
import Config from "../../mips/library/config/config";

@Injectable({
    providedIn: "root",
})
export class SvgService {
    protected _elements = [];
    protected _activeClock: Clock = new NullClock();
    protected _emphasizedIds: any[] = [];
    protected _fadeInKeyframes = Array.from(Config.get().visual.opacitySteps).reverse() as any[];
    protected _fadeOutKeyframes = Config.get().visual.opacitySteps;
    protected _animationDuration = Config.get().visual.animationDuration;

    public visualiseClock(clock: Clock) {
        this._activeClock = clock;
        const clockConfig = Config.clockConfig(clock);

        // Reduce opacity of all elements.
        animate(this._elements, { keyframes: this._fadeOutKeyframes, duration: this._animationDuration });

        // Fade in focused elements.
        animate(this.findElements(clockConfig.focus), { keyframes: this._fadeInKeyframes, duration: this._animationDuration });
    }

    public mouseMove($event): void {
        const tooltip = Config.elementTooltip($event.target, this._activeClock);
        this.deEmphasize(this.findElements(this._emphasizedIds));

        if (tooltip) {
            this.emphasize(this.findElements(tooltip.ids.concat(tooltip.additional)));
            this._emphasizedIds = tooltip.ids.concat(tooltip.additional);
        }
    }

    public emphasize(elements): void {
        elements.forEach(element => {
            if (Config.elementType(element) === Config.ELEMENT_TEXT) {
                animate(element, { fill: Config.get().visual.emphasizeTextColor });
            } else if (Config.elementType(element) === Config.ELEMENT_LABEL) {
                animate(element, { fill: Config.get().visual.emphasizeLabelColor });
            } else if (Config.elementType(element) === Config.ELEMENT_COMPONENT) {
                animate(element, { fill: Config.get().visual.emphasizeComponentColor });
            } else if (Config.elementType(element) === Config.ELEMENT_ARROW) {
                animate(element, { fill: Config.get().visual.emphasizeColor });
            } else if (Config.elementType(element) === Config.ELEMENT_PATH) {
                animate(element, { stroke: Config.get().visual.emphasizeColor });
            } else {
                animate(element, { fill: Config.get().visual.emphasizeColor });
            }
        });
    }

    public deEmphasize(elements, animated = true): void {
        elements.forEach(element => {
            const type = Config.elementType(element);
            const attribute = type === Config.ELEMENT_PATH ? "stroke" : "fill";
            let color = Config.get().visual.deEmphasizeColor;

            if (type === Config.ELEMENT_TEXT) {
                color = Config.get().visual.deEmphasizeTextColor;
            } else if (type === Config.ELEMENT_LABEL) {
                color = Config.get().visual.deEmphasizeLabelColor;
            } else if (type === Config.ELEMENT_COMPONENT) {
                color = Config.get().visual.deEmphasizeComponentColor;
            }

            if (animated) {
                animate(element, { [attribute]: color });
            } else {
                element.setAttribute(attribute, color);
            }
        });
    }

    public set elements(values: NodeListOf<Element>) {
        this._elements.splice(0, this._elements.length);

        values.forEach(it => this._elements.push(it));

        // Apply the initial SVG theme synchronously. Anime.js v4 schedules writes
        // for a later frame, which caused the raw white SVG to flash or remain
        // visible during Angular's initial render.
        this.deEmphasize(this._elements, false);
    }

    public reset(): void {
        this.deEmphasize(this._elements);
        this._emphasizedIds = [];
        this._activeClock = new NullClock();

        // Fade in all elements
        animate(this._elements, { duration: this._animationDuration, keyframes: this._fadeInKeyframes });
    }

    public set animationDuration(value) {
        this._animationDuration = value;
    }

    public get animationDuration() {
        return this._animationDuration;
    }

    protected findElements(ids: any[]): any[] {
        if (ids.length === 0) return [];
        const result = [];

        document
            .querySelectorAll(
                ids
                    .map(it => {
                        return parseInt(it, 10) ? `[id="${it}"]` : `#${it}`;
                    })
                    .join(","),
            )
            .forEach(it => result.push(it));

        return result;
    }
}
