import { Component, OnInit } from "@angular/core";
import { User } from 'src/app/models/user';
import { UserService } from '../user.service';

@Component({
    selector: 'user-detail',
    templateUrl: '../user-edit/user-edit.component.html',
    providers: [UserService]
})

export class UserDetailComponent implements OnInit{
    
    public user: User;
    public userLogged;

    constructor(
        private _userService: UserService
    ){
        this.userLogged = this._userService.getUserLogged();
    }
    
    ngOnInit(){
        
        this.getUser();
    }

    getUser(){

        this._userService.getUser(this.userLogged._id).subscribe(
            response => {
                console.log(response.user);
                if(!response.user){

                }else{
                    this.user = response.user;
                }
            },
            error => {
                console.log(error);
            }
        )
    }
}