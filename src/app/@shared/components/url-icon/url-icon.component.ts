import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-url-icon',
    templateUrl: './url-icon.component.html',
    styleUrls: ['./url-icon.component.scss'],
})
export class UrlIconComponent {
    @Input()
    public icon: string;
    @Input()
    public label: string;
    @Input()
    public url: string;
}
