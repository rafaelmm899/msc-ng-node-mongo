import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardComponent } from '../dashboard/dashboard.component';
import { Dashboard } from './dashboard.routing.module';
import { HomeComponent } from '../home/home.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'

@NgModule({
    declarations : [
        DashboardComponent,
        HomeComponent
    ],
    imports : [
        Dashboard,
        BsDropdownModule.forRoot()
    ],
    exports : [

    ],
    providers : [

    ]
})

export class DashboardModule {}