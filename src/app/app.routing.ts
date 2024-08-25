import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

export const AppRouting: ModuleWithProviders<any> = RouterModule.forRoot([], { onSameUrlNavigation: 'reload' });
