import { Component,OnInit } from "@angular/core";
import { Route, ActivatedRoute, Router,Params } from "@angular/router";

import { Song } from "../../models/song";
import { User } from "../../models/user";
import { UserService } from "../../user/user.service";
import { UploadService } from "../../services/upload.service";
import { MessageService } from "../../messages/message.service";
import { SongService } from "../song.service";
import { GLOBAL } from 'src/global';

@Component({
    selector :'song-create',
    templateUrl:'./song-create.component.html',
    providers: [UploadService, MessageService, UserService, SongService]
})

export class SongCreateComponent implements OnInit{
    public title: string;
    public song: Song;
    public token: string;
    public albumId: string;
    public url: string;
    public filesToUpload: Array<File>;

    constructor(
        private _userService: UserService,
        private _uploadService: UploadService,
        private _messageService: MessageService,
        private _songService: SongService,
        private _route: ActivatedRoute,
        private _router: Router
    ){
        this.title = 'Create Song';
        this.song = new Song('','',0,'','','','');
        this.token = this._userService.getTokenInLocalStorage();
        this.albumId =  this._route.snapshot.params.albumId;
        this.url = GLOBAL.url;
    }

    ngOnInit(){

    }

    onSubmit(){
        this.song.album = this.albumId;
        console.log(this.song);
        this._songService.save(this.token,this.song).subscribe(
            response => {
                if(!response.song){
                    this._messageService.sendMessage(response.message,'danger');
                }else{
                    this.song = response.song;

                    if(this.filesToUpload){
                        this._uploadService.makeFileRequest(this.url+'upload_song/'+this.song._id,[],this.filesToUpload,this.token,'file').then(
                            (result) => {
                                console.log(result);
                            },
                            (error) => {
                                console.log(error);
                            }
                        )
                    }
                        

                    this._router.navigate(['/dashboard/songs/'+this.albumId]);
                }
            },
            error => {
                console.log(error);
            }
        )
    }

    
    uploadFile(input: any){
        this.filesToUpload = <Array<File>>input.target.files;
    }

}