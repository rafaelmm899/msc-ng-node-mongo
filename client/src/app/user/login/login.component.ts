import { Component, OnInit } from '@angular/core';

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
	public message: String;
	public token;

	constructor(
		private _userService : UserService
	) { 
		this.user = new User('','','','','','','');
	}

	ngOnInit() {
	}

  	onSubmit(){
      	this._userService.login(this.user).subscribe(
			response =>{
			
				if(!response.user){
					this.message = response.message;
				}else{
					this._userService.getToken(this.user).subscribe(
					resp =>{
						this.token = resp.token;
						if(this.token.length <= 0){
							this.message = resp.message;
						}else{
							localStorage.setItem('token',this.token);
							this.message = 'User successfully logged in';
						}
					},
					err => {
						
					})
				}
			},
			error => {
			console.log(error)
			}
      	)
  	}

}
