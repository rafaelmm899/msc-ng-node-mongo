import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardComponent } from '../dashboard/dashboard.component';
import { Dashboard } from './dashboard.routing.module';
import { HomeComponent } from '../home/home.component';

@NgModule({
    declarations : [
        DashboardComponent,
        HomeComponent
    ],
    imports : [Dashboard],
    exports : [

    ],
    providers : [

    ]
})

export class DashboardModule {}