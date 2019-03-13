import { Component, OnInit } from "@angular/core";
import { User } from 'src/app/models/user';
import { UserService } from '../user.service';
import { Route, Router, ActivatedRoute, Params } from "@angular/router";
import { GLOBAL } from 'src/global';


@Component({
    selector :'user-edit',
    templateUrl: './user-edit.component.html',
    providers: [UserService]
})

export class UserEditComponent implements OnInit {
    public user : User;
    public url : String;
    public message : String;

    constructor(
        private _userService: UserService,
        private _route: ActivatedRoute,
        //private _router: Route 
    ) {
        this.user = new User('','','','','','','');
        this.url = GLOBAL.url;
    }

    ngOnInit(){
        this.getUser();
    }

    getUser(){
        this._route.params.forEach((params : Params) => {
            let id = params['id'];

            this._userService.getUser(id).subscribe(
                response => {
                    if(!response.user){

                    }else{
                        this.user = response.user;
                        this.user.password = '';
                    }
                },
                error => {
                    console.log(error);
                }
            )
        }) 
    }
}