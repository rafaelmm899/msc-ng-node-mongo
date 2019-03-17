import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../user/user.service';
import { GLOBAL } from 'src/global';


 

@Component({
  	selector: 'app-dashboard',
  	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css'],
	providers: [UserService]

})
export class DashboardComponent implements OnInit {

	public items: string[];
	public userLogged;
	public url;

	constructor(
		private _userService: UserService
	) {  
		this.userLogged = _userService.getUserLogged();
		this.url = GLOBAL.url;
	}

	ngOnInit() {
		console.log(this.userLogged);
	}

	onHidden(): void {
		console.log('Dropdown is hidden');
	}

	onShown(): void {
		console.log('Dropdown is shown');
	}

	isOpenChange(): void {
		console.log('Dropdown state is changed');
	}

}
