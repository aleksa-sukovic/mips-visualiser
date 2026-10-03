import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "app-footer",
    templateUrl: "./footer.component.html",
    styleUrls: ["./footer.component.scss"],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class FooterComponent {
    public year: number;

    public constructor() {
        this.year = new Date().getFullYear();
    }
}
