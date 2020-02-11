import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SafeHtmlPipe } from './pipes/safe-html/safe-html.pipe';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        SafeHtmlPipe,
    ],
    imports: [
        RouterModule,
        FontAwesomeModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        FontAwesomeModule,
        SafeHtmlPipe,
    ]
})
export class SharedModule
{

}
