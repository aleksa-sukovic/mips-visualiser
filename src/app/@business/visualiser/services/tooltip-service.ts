import Anime from 'animejs/lib/anime.es.js';
import { CPUService } from './cpu.services';
import config from '../../mips/library/config';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class TooltipService
{
    public width = 250;
    public paddingBottom =  15;
    public visible = false;

    public constructor (private cpuService: CPUService)
    {
        //
    }

    public mouseMove ($event): void
    {
        const clockConfig = config.visualisations.find(it => it.id === this.cpuService.clock.id());

        if (clockConfig) {
            // const element = $event.target;
            const tooltip = clockConfig.tooltips.find(it => it.ids.find(id => id == $event.target.id));

            if (tooltip) {
                const mouseX = $event.clientX;
                const mouseY = $event.pageY + document.body.scrollTop;
                this.show(mouseX, mouseY);
            } else {
                this.hide();
            }
        }
    }

    public show (mouseX: number, mouseY: number): void
    {
        this.tooltip().style.left = mouseX + 'px';
        this.tooltip().style.top = (mouseY - this.paddingBottom) + 'px';

        if (!this.visible) {
            this.fadeIn();
        }

        this.visible = true;
    }

    public hide (): void
    {
        if (this.visible) {
            this.fadeOut();
        }
        this.visible = false;
    }

    public tooltip (): any
    {
        return document.getElementById('tooltip') || {};
    }

    protected fadeIn (): void
    {
        Anime({
            targets: this.tooltip(),
            keyframes: [
                { opacity: 0 },
                { opacity: 0.2 },
                { opacity: 0.4 },
                { opacity: 0.6 },
                { opacity: 0.8 },
                { opacity: 1 },
            ],
            duration: 300,
        });
    }

    protected fadeOut (): void
    {
        Anime({
            targets: this.tooltip(),
            keyframes: [
                { opacity: 1 },
                { opacity: 0.8 },
                { opacity: 0.6 },
                { opacity: 0.4 },
                { opacity: 0.2 },
                { opacity: 0 },
            ],
            duration: 300,
        });
    }
}
