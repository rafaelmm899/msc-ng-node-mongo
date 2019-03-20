import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from 'src/app/models/user';
import { GLOBAL } from 'src/global';
import { UploadService } from 'src/app/services/upload.service';
import { Route, ActivatedRoute, Router } from "@angular/router";
import { MessageService } from 'src/app/messages/message.service';


@Component({
  selector: 'app-user-create',
  templateUrl: '../user-edit/user-edit.component.html',
  providers: [UserService, UploadService, MessageService]
})
export class UserCreateComponent implements OnInit {
	public message: String;
	public user : User;
	public url: String;
	public userImg:any;
	public buttonTitle: string;
	public filesToUpload : Array<File>;
	public token: string;

	constructor(
		private _userService: UserService,
		private _uploadService: UploadService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _messageService: MessageService
	) { 
		this.user = new User('','','','','','','ROLE_USER');
		this.url = GLOBAL.url;
		this.userImg = 'assets/images/default-user-image.png';
		this.buttonTitle = 'Create';
		this.token = _userService.getTokenInLocalStorage();
	}

	ngOnInit() {
		
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
	}
	
	selectImage(){
        document.getElementById("inputImageUser").click();
    }

	onSubmit() {
		console.log(this.user);
		this._userService.newUser(this.user).subscribe(
			response => {
				if(!response.user){
					this.message = response.message;
				}else{
					this.user = response.user;
					this._messageService.add("User created successfully");
					
					if(this.filesToUpload){
						this._uploadService.makeFileRequest(this.url+'user/upload_image/'+this.user._id,[],this.filesToUpload,this.token,'image').then(
							(result) => {
								this._router.navigate(['dashboard/user-list']);
							},
							(error) =>{
								console.log(error);
							}
						)
					}else{
						this._router.navigate(['dashboard/user-list']);
					}
				}
			},
			error => {
				this.message = 'Error in the request, try again';
			}
		)	
	}

}
