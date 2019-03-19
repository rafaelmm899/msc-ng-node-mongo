import { Component, OnInit } from "@angular/core";
import { User } from 'src/app/models/user';
import { UserService } from '../user.service';
import { Route, Router, ActivatedRoute, Params } from "@angular/router";
import { GLOBAL } from 'src/global';
import { UploadService } from 'src/app/services/upload.service';


@Component({
    selector :'user-edit',
    templateUrl: './user-edit.component.html',
    providers: [UserService, UploadService]
})

export class UserEditComponent implements OnInit {
    public user : User;
    public url : String;
    public message : String;
    public userImg: any;
    public filesToUpload : Array<File>;
    public token;

    constructor(
        private _userService: UserService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _uploadService: UploadService
    ) {
        this.user = new User('','','','','','','');
        this.url = GLOBAL.url;
        this.userImg = 'assets/images/default-user-image.png';
        this.token = this._userService.getTokenInLocalStorage();
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
                        if(this.user.image){
                            this.userImg = this.url+'user/get_image_profile/'+this.user.image; 
                        }
                    }
                },
                error => {
                    console.log(error);
                }
            )
        }) 
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
        this._route.params.forEach((params : Params) => {
            let id = params['id'];
            

            this._userService.updateUser(id, this.user).subscribe(
                response => {
                    if(!response.user){
                        this.message = response.message;
                    }else{

                        if(this.filesToUpload){
                            this._uploadService.makeFileRequest(this.url+'user/upload_image/'+this.user._id,[],this.filesToUpload,this.token,'image').then(
                                (result) => {
                                    this._router.navigate(['dashboard/user-list']);
                                },
                                (error) =>{
                                    console.log(error);
                                }
                            )
                        }
                        
                    }
                },
                error =>{

                }
            )
        
        })
    }
}