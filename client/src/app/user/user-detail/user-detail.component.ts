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
    public userImg: any;
    public buttonTitle: string;

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
        this.userImg = 'assets/images/default-user-image.png';
        this.buttonTitle = 'Edit';
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
                    if(this.user.image){
                        this.userImg = this.url+'user/get_image_profile/'+this.user.image; 
                    }
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

    changeImg(data: any){
        if(data.file){
            this.userImg = this.url+'user/get_image_profile/'+data.file+'/true';
        }
    }

    preview(files) {
        if (files.length === 0)
          return;
     
        var mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
          this.message = "Only images are supported.";
          return;
        }
     
        var reader = new FileReader();
        this.userImg = files;
        reader.readAsDataURL(files[0]); 
        reader.onload = (_event) => { 
            this.userImg = reader.result; 
        }
    }

    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
        this.preview(fileInput.target.files);
        /*this._uploadService.makeFileRequest(this.url+'user/upload_tmp/'+this.user._id,[],this.filesToUpload,this.token,'image').then(
            (result) => {
                this.changeImg(result);
            },
            (error) =>{
                console.log(error);
            }
        )*/
    }

    onSubmit(){
        this._userService.updateUser(this.user._id, this.user).subscribe(
            response => {
                if(!response.user){
                    this.message = response.message;
                }else{
                    //this._router.navigate(['dashboard/user-list']);
                    if(this.filesToUpload){
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