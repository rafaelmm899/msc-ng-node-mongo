import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { DashboardModule } from "./dashboard/dashboard.module";

import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';

import { AppRouting } from './app.routing';
import { UserCreateComponent } from './user/user-create/user-create.component';

@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    UserCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRouting,
    DashboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
