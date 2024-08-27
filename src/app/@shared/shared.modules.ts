import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SafeHtmlPipe } from './pipes/safe-html/safe-html.pipe';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import { UrlIconComponent } from './components/url-icon/url-icon.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        UrlIconComponent,
        SafeHtmlPipe,
    ],
    imports: [
        RouterModule,
        FontAwesomeModule,
        BrowserAnimationsModule,
        AngularSvgIconModule,
        ToastrModule.forRoot(),
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        UrlIconComponent,
        FontAwesomeModule,
        SafeHtmlPipe,
    ]
})
export class SharedModule
{

}
