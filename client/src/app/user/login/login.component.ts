import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';

import { User } from '../../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers : [UserService]
})
export class LoginComponent implements OnInit {
	public user: User;
	public userToCreate: User;
	public message: String;
	public token;
	public loginForm: boolean;

	constructor(
		private _userService : UserService,
		private _route : ActivatedRoute,
		private _router : Router

	) { 
		this.user = new User('','','','','','','');
		this.userToCreate = new User('','','','','','','ROLE_USER');
		this.loginForm = false;
	}

	ngOnInit() {
	}

  	onSubmit(){
      	this._userService.login(this.user).subscribe(
			response =>{
			
				if(response.message){
					this.message = response.message;
				}else{
					
					this._userService.getToken(this.user).subscribe(
						resp =>{
							this.token = resp.token;
							if(this.token.length <= 0){
								this.message = resp.message;
							}else{
								this.user = response.user;
								localStorage.setItem('token',this.token);
								localStorage.setItem('currentUser', JSON.stringify(this.user));
								
								this._router.navigate(['/dashboard/home']);
							}
						},
						err => {
							this.message = 'Error in the request, try again';
						}
					)
				}
			},
			error => {
				this.message = 'Error in the request, try again';
			}
      	)
	}
	  
	showCreateForm(){
		this.loginForm = false;
	}

	showLoginForm(){
		this.loginForm = true;
	}

	addUser() {
		this._userService.newUser(this.userToCreate).subscribe(
			response => {
				if(!response.user){
					this.message = response.message;
				}else{
					this.userToCreate = response.user;
					this.message = 'The user has been created successfully, please log in';
				}
			},
			error => {
				this.message = 'Error in the request, try again';
			}
		)	
	}

}
