import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

const appRoutes : Routes = [
    { path: 'dashboard', component: DashboardComponent }
]


export const AppRoutingProviders: any[] =  [];
export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes); 
