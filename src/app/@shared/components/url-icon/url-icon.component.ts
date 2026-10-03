import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-url-icon',
    templateUrl: './url-icon.component.html',
    styleUrls: ['./url-icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class UrlIconComponent {
    @Input()
    public icon: string;
    @Input()
    public label: string;
    @Input()
    public url: string;
}
