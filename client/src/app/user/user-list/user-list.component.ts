import { Component, OnInit, TemplateRef } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../user.service';
import { Route, Router, Params, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component'

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
	public idUserToDelete: string;
	public alerts: any[];
	modalRef: BsModalRef;

  	constructor(
		private _userService: UserService,
		private _route: ActivatedRoute,
		private _router: Router,
		private modalService: BsModalService
	) {
		this.idUserToDelete = null;
		this.alerts = [];
	}

	ngOnInit() {
		this.getUsers();
		console.log(this.alerts);
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

	openModal(template: TemplateRef<any>, idUser: string) {
		this.idUserToDelete = idUser;
		this.modalRef = this.modalService.show(template);
	}

	confirm(){
		if(this.idUserToDelete != null){
			this._userService.deleteUser(this.idUserToDelete).subscribe(
				response => {
					if(!response.user){
						this.showMessage(response.message, 'danger');
					}else{
						this.showMessage('User successfully removed', 'success');
						this.getUsers();
					}
				},
				error => {
					console.log(error);
				}
			)
		}
		this.modalRef.hide();
	}

	decline(){
		this.idUserToDelete = null;
		this.modalRef.hide();
	}

	showMessage(message:string, type : string): void {
		this.alerts.push({
		  	type: type,
		  	msg: message,
		  	timeout: 5000
		});
	}
	 
	onClosed(dismissedAlert: AlertComponent): void {
		this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
	}

}
