import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SharedModule } from './@shared/shared.modules';
import { GlobalModule } from './@global/global.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule,

        SharedModule,
        GlobalModule,
    ],
    providers: [],
    bootstrap: [
        AppComponent,
    ]
})
export class AppModule
{
    //
}
