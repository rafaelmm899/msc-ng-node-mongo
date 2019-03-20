import { NgModule } from "@angular/core";

import { BrowserModule } from '@angular/platform-browser';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { Dashboard } from './dashboard.routing.module';
import { HomeComponent } from '../home/home.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MessagesComponent } from '../messages/messages.component';

@NgModule({
    declarations : [
        DashboardComponent,
        HomeComponent,
        MessagesComponent
    ],
    imports : [
        Dashboard,
        BsDropdownModule.forRoot(),
        BrowserModule
    ],
    exports : [

    ],
    providers : [

    ]
})

export class DashboardModule {}