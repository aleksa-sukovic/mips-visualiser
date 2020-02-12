import Anime from 'animejs/lib/anime.es.js';
import { CPUService } from './cpu.services';
import { Injectable } from '@angular/core';
import Config from '../../mips/library/config/config';

@Injectable({
    providedIn: 'root',
})
export class TooltipService
{
    public paddingBottom =  15;
    public visible = false;

    public tooltipTitle = '';
    public tooltipDescription = '';
    public tooltipValue = '';

    public constructor (private cpuService: CPUService)
    {
        //
    }

    public mouseMove ($event, useCurrentTarget: boolean = false): void
    {
        const target = useCurrentTarget ? $event.currentTarget : $event.target;
        const tooltip = Config.elementTooltip(target) ||
            Config.elementTooltip(target, this.cpuService.clock);

        if (tooltip) {
            this.show(
                $event.clientX,
                $event.pageY + document.body.scrollTop,
                tooltip.title,
                tooltip.description,
                tooltip.value(this.cpuService.cpu)
            );
        } else {
            this.hide();
        }
    }

    public show (mouseX: number, mouseY: number, title: string = '', description: string = '', value: string = ''): void
    {
        // constraint tooltip [left size]
        const browserWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        mouseX = mouseX - this.width / 2 > 0 ? mouseX : this.width / 2;
        mouseX = mouseX + this.width > browserWidth ? browserWidth - this.width / 2 : mouseX;

        this.tooltipTitle = title;
        this.tooltipDescription = description;
        this.tooltipValue = value;
        this.tooltip().style.left = mouseX + 'px';
        this.tooltip().style.top = (mouseY - this.paddingBottom) + 'px';
        this.tooltip().style.zIndex = 100;

        if (!this.visible) {
            this.fadeIn();
        }

        this.visible = true;
    }

    public hide (): void
    {
        if (this.visible) {
            this.tooltip().style.zIndex = -1;
            this.fadeOut();
        }
        this.visible = false;
    }

    public tooltip (): any
    {
        return document.getElementById('tooltip') || {};
    }

    public get width ()
    {
        return this.tooltip().offsetWidth;
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
