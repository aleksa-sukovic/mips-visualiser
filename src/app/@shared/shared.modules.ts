import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SafeHtmlPipe } from './pipes/safe-html/safe-html.pipe';

@NgModule({
    declarations: [
        HeaderComponent,
        SafeHtmlPipe,
    ],
    imports: [
        RouterModule,
        FontAwesomeModule,
    ],
    exports: [
        HeaderComponent,
        FontAwesomeModule,
        SafeHtmlPipe,
    ]
})
export class SharedModule
{

}
