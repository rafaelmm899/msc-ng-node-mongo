import { Component, OnInit,TemplateRef } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { Album } from "../../models/album";
import { User } from "../../models/user";
import { UserService } from "../../user/user.service";
import { AlbumService } from "../album.service";
import { MessageService } from "../../messages/message.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'album-list',
    templateUrl: './album-list.component.html',
    providers : [ UserService,AlbumService,MessageService ]
})

export class AlbumListComponent implements OnInit {
    public album : Album;
    public albums : Album[];
    public token : string;
    public nextPage;
    public prePage;
    public artistId: string;
    public idAlbumToDelete: string;
    public modalRef: BsModalRef;

    constructor(
        private _userService: UserService,
        private _albumService: AlbumService,
        private _router: Router,
        private _route : ActivatedRoute,
        private _messageService: MessageService,
        private modalService: BsModalService
    ){
        this.token = _userService.getTokenInLocalStorage();
        this.idAlbumToDelete = null;
    }

    ngOnInit(){
        this.getAlbums();
    }

    getAlbums(){
        this._route.params.forEach((param : Params) => {
            let page = param['page'];
            this.artistId = param['id'];
			if(!page){
				page = 1;
			}else{
				this.nextPage = page + 1;
				this.prePage = page - 1;
			}

			if(this.prePage == 0){
				this.prePage = 1;
            }
        
            this._albumService.getAlbums(this.token, this.artistId,page).subscribe(
                response => {
                    if(!response.album){
                        this._messageService.sendMessage(response.message,'danger');
                    }else{
                        this.albums = response.album.docs;
                    }
                },
                error => {
                    console.log(error);
                }
            )

        })
    }

    openModal(template: TemplateRef<any>, idAlbum: string) {
		this.idAlbumToDelete = idAlbum;
		this.modalRef = this.modalService.show(template);
    }

    confirm(){
        if(this.idAlbumToDelete){
            this._albumService.deleteAlbum(this.token,this.idAlbumToDelete).subscribe(
                response => {
                    if(!response.album){
                        this._messageService.sendMessage(response.message, 'danger');
                    }else{
                        this._messageService.sendMessage('The album has been removed correctly', 'success');
                    }
                    this.getAlbums();
                },
                error => {
                    console.log(error);
                }
            )
            this.modalRef.hide();
        }
    }

    decline(){
        this.idAlbumToDelete = null;
        this.modalRef.hide();
    }

}