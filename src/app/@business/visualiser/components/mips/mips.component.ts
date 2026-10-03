import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from "@angular/core";
import { SvgService } from "../../services/svg.service";
import { CPUService } from "../../services/cpu.services";
import { TooltipService } from "../../services/tooltip-service";

@Component({
    selector: "app-mips",
    templateUrl: "./mips.component.html",
    styleUrls: ["./mips.component.scss"],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class MipsComponent implements AfterViewInit {
    @ViewChild("processorSvg", { static: true })
    private processorSvg!: ElementRef<SVGSVGElement>;

    public svg: any;

    public constructor(
        private svgService: SvgService,
        private cpuService: CPUService,
        private tooltipService: TooltipService,
    ) {
        //
    }

    public ngAfterViewInit(): void {
        this.svgService.elements = this.processorSvg.nativeElement.querySelectorAll("text,path,circle,g,rect");
    }

    public handleMouseMove($event) {
        this.svgService.mouseMove($event);
        this.tooltipService.mouseMove($event);
    }
}
