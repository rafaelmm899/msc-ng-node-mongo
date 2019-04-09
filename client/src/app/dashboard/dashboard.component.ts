import { Component, OnInit, DoCheck } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../user/user.service';
import { GLOBAL } from 'src/global';
import { Router,ActivatedRoute } from "@angular/router";
import { SharedService } from '../services/shared.service';
import { Subscription } from "rxjs";
 

@Component({
  	selector: 'app-dashboard',
  	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css'],
	providers: [UserService, SharedService]

})
export class DashboardComponent implements OnInit, DoCheck {
	public subscription: Subscription;
	public items: string[];
	public userLogged;
	public url;
	public profileImage;
	public token: string;

	constructor(
		private _userService: UserService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _sharedService: SharedService
	) {  
		this.userLogged = _userService.getUserLogged();
		this.token = _userService.getTokenInLocalStorage();
		this.url = GLOBAL.url;
		this.profileImage = 'assets/images/default-user-image.png'
		
	}

	ngDoCheck(){
		let currentUser = this._userService.getUserLogged();
		let token = this._userService.getTokenInLocalStorage();

		if(token != this.token){
			this.logout();
		}
		this.subscription = this._sharedService.getChange().subscribe(song => { console.log(song) });
	}

	ngOnInit() {
		this.checkImageUser();
	}

	checkImageUser(){
		if(this.userLogged.image){
			this.profileImage = this.url+'user/get_image_profile/'+this.userLogged.image;
		}
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

	logout(){
		this._userService.logout();
		this._router.navigate(['']);
	}

}
