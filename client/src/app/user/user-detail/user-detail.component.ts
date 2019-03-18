import { Component, OnInit,SecurityContext  } from "@angular/core";
import { DomSanitizer } from '@angular/platform-browser';
import { User } from 'src/app/models/user';
import { UserService } from '../user.service';
import { Route, Router, Params, ActivatedRoute } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';
import { GLOBAL } from 'src/global';


@Component({
    selector: 'user-detail',
    templateUrl: '../user-edit/user-edit.component.html',
    providers: [UserService, UploadService]
})

export class UserDetailComponent implements OnInit{
    
    public user: User;
    public userLogged;
    public filesToUpload : Array<File>;
    public message: string;
    public token;
    public url;
    public alerts: any[];

    constructor(
        private _userService: UserService,
        private _uploadService: UploadService,
        private _route: ActivatedRoute,
        private _router: Router,
        sanitizer: DomSanitizer
    ){
        this.url = GLOBAL.url;
        this.token = this._userService.getTokenInLocalStorage();
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

    selectImage(){
        document.getElementById("inputImageUser").click();
    }

    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
        console.log(this.filesToUpload);
    }

    onSubmit(){
        this._userService.updateUser(this.user._id, this.user).subscribe(
            response => {
                if(!response.user){
                    this.message = response.message;
                }else{
                    //this._router.navigate(['dashboard/user-list']);
                    this._uploadService.makeFileRequest(this.url+'user/upload_image/'+this.user._id,[],this.filesToUpload,this.token,'image').then(
                        (result) => {
                            this.alerts = [
                                {
                                    type: 'success',
                                    msg: `<strong>Well done!</strong> Profile successfully edited`
                                }
                            ];

                            //this.message = 'Profile successfully edited';
                        },
                        (error) =>{
                            console.log(error);
                            this.alerts = [
                                {
                                    type: 'danger',
                                    msg: `<strong>Error!</strong> Error uploading the file`
                                }
                            ];
                        }
                    )
                }
            },
            error =>{
                console.log(error);
                //this.message = 'Error uploading the file';
                this.alerts = [
                    {
                        type: 'danger',
                        msg: `<strong>Error!</strong> Error uploading the file`
                    }
                ];
            }
        )
    }
}