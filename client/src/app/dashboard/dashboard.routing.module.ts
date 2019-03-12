import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from '../home/home.component';
import { UserListComponent } from '../user/user-list/user-list.component';


const dashboardRoutes : Routes = [{
	path : 'dashboard',
	component : DashboardComponent,
	children : [
		{ path : 'home',component : HomeComponent },
		{ path: 'user-list', component : UserListComponent }
	]
	
}]

@NgModule({
  	declarations: [],
  	imports: [
		RouterModule.forChild(dashboardRoutes),
    	CommonModule
	  ],
	  exports:[
		  RouterModule
	  ]
})
export class Dashboard { }
