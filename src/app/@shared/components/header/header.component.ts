import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class HeaderComponent {
    public constructor() {
        //
    }
}
