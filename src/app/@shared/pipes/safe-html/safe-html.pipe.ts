import { DomSanitizer } from "@angular/platform-browser";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "safeHtml",
    standalone: false,
})
export class SafeHtmlPipe implements PipeTransform {
    public constructor(private sanitizer: DomSanitizer) {
        //
    }

    public transform(style) {
        return this.sanitizer.bypassSecurityTrustHtml(style);
    }
}
