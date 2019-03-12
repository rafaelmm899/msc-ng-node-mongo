import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../user.service';
import { Route, Router, Params, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers : [UserService]
})
export class UserListComponent implements OnInit {
	public users : User[];
	public nextPage;
	public prePage;

  	constructor(
		private _userService: UserService,
		private _route: ActivatedRoute,
		private _router: Router
	) {
		
	}

	ngOnInit() {
		this.getUsers();
	}

	getUsers(){
		this._route.params.forEach((param : Params) => {
			let page = param['page'];
			if(!page){
				page = 1;
			}else{
				this.nextPage = page + 1;
				this.prePage = page - 1;
			}

			if(this.prePage == 0){
				this.prePage = 1;
			}

			this._userService.getUsers(page).subscribe(
				response => {
					if(response.users){
						this.users = response.users.docs
					}
				},
				error => {
					console.log(error);	
				}
			)

		})
	}

}
