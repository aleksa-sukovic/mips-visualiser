import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisualiserControllerComponent } from './components/visualiser-controller/visualiser-controller.component';

const routes: Routes = [
    {
        path: '',
        component: VisualiserControllerComponent,
    },
];

export const VisualiserRouting: ModuleWithProviders = RouterModule.forChild(routes);
