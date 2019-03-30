import { Component,OnInit, TemplateRef } from "@angular/core";
import { Route,ActivatedRoute, Router, Params } from "@angular/router";

import { Song } from "../../models/song";
import { User } from "../../models/user";
import { UserService } from "../../user/user.service";
import { UploadService } from "../../services/upload.service";
import { MessageService } from "../../messages/message.service";
import { SongService } from "../song.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector :'song-list',
    templateUrl:'./song-list.component.html',
    providers: [UploadService, MessageService, UserService, SongService]
})

export class SongListComponent implements OnInit{
    public token: string;
    public albumId: string;
    public nextPage:any;
    public prePage: any;
    public songs: Song[];
    public modalRef: BsModalRef;
    public idSongToDelete:string;

    constructor(
        private _userService: UserService,
        private _uploadService: UploadService,
        private _messageService: MessageService,
        private _songService: SongService,
        private _route: ActivatedRoute,
        private _router: Router,
        private modalService: BsModalService
    ){
        this.token = this._userService.getTokenInLocalStorage()
        this.albumId = this._route.snapshot.params.albumId;
    }

    ngOnInit(){
        this.getSongs();
        this.idSongToDelete = null;
    }

    getSongs(){
        this._route.params.forEach((param : Params) => {
            let page = param['page'];
            this.albumId = param['id'];
			if(!page){
				page = 1;
			}else{
				this.nextPage = page + 1;
				this.prePage = page - 1;
			}

			if(this.prePage == 0){
				this.prePage = 1;
            }
            this._songService.getSongs(this.token, this.albumId, page).subscribe(
                response => {
                    if(!response.song){
                        this._messageService.sendMessage(response.message, 'danger');
                    }else{
                        this.songs = response.song.docs;
                    }
                },
                error => {
                    console.log(error);
                }
            )
        })
    }

    openModal(template: TemplateRef<any>, idSong: string) {
		this.idSongToDelete = idSong;
		this.modalRef = this.modalService.show(template);
    }

    confirm(){
        if(this.idSongToDelete){
            this._songService.delete(this.token,this.idSongToDelete).subscribe(
                response => {
                    if(!response.song){
                        this._messageService.sendMessage(response.message, 'danger');
                    }else{
                        this._messageService.sendMessage('Song deleted successfully', 'success');
                        this.getSongs();
                        this.idSongToDelete = null;
                    }
                },
                error => {
                    if(error.error.message){
                        this._messageService.sendMessage(error.error.message, 'danger');
                    }
                    console.log(error);
                }
            )
        }
        this.modalRef.hide();
    }

    decline(){
        this.idSongToDelete = null;
        this.modalRef.hide();
    }
}