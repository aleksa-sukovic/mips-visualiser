import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AngularSvgIconModule } from 'angular-svg-icon';

import { SharedModule } from './@shared/shared.modules';
import { GlobalModule } from './@global/global.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRouting } from './app.routing';
import { VisualiserModule } from './@business/visualiser/visualiser.module';
import { VisualiserControllerComponent } from './@business/visualiser/components/visualiser-controller/visualiser-controller.component';

@NgModule({
    declarations: [
        AppComponent,
        VisualiserControllerComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule,

        AppRouting,
        SharedModule,
        GlobalModule,

        VisualiserModule,

        AngularSvgIconModule.forRoot(),
    ],
    providers: [provideHttpClient(withInterceptorsFromDi())],
    bootstrap: [
        AppComponent,
    ]
})
export class AppModule
{
    //
}
