import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [
        HeaderComponent,
    ],
    imports: [
        RouterModule,
        FontAwesomeModule,
    ],
    exports: [
        HeaderComponent,
        FontAwesomeModule,
    ]
})
export class SharedModule
{

}
