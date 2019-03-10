import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from '../home/home.component';


const dashboardRoutes : Routes = [{
	path : 'dashboard',
	component : DashboardComponent,
	children : [
		{ path : '',component : HomeComponent }
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
