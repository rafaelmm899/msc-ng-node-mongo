import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from 'src/app/models/user';
import { GLOBAL } from 'src/global';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  providers: [UserService]
})
export class UserCreateComponent implements OnInit {
	public message: String;
	public user : User;
	public url: String;

	constructor(
		private _userService: UserService
	) { 
		this.user = new User('','','','','','','ROLE_USER');
		this.url = GLOBAL.url;
	}

	ngOnInit() {
	}

	public onSubmit() {
		this._userService.newUser(this.user).subscribe(
			response => {
				if(!response.user){
					this.message = response.message;
				}else{
					this.user = response.user;
					this.message = 'The user has been created successfully, please log in';
				}
			},
			error => {
				this.message = 'Error in the request, try again';
			}
		)	
	}

}
