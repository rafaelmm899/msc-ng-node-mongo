import { Component, OnInit, TemplateRef } from "@angular/core";
import { Route, Router, ActivatedRoute, Params } from '@angular/router';

import { Artist } from "../../models/artist";
import { ArtistService } from "../artist.service";
import { UserService } from '../../user/user.service';
import { MessageService } from "../../messages/message.service";

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector : 'artist-list',
    templateUrl : './artist-list.component.html',
    providers: [ArtistService, UserService, MessageService]
})

export class ArtistListComponent implements OnInit {
    public artists: Artist[];
    public token;
    public nextPage;
    public prePage;
    public idArtistToDelete:string;
    public modalRef: BsModalRef;

    constructor(
        private _artistService: ArtistService,
        private _userService: UserService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _messageService: MessageService,
        private modalService: BsModalService,
    ){
        this.idArtistToDelete = null;
        this.token = this._userService.getTokenInLocalStorage();
    }

    ngOnInit(){
        this.getArtist();
    }

    openModal(template: TemplateRef<any>, idArtist: string) {
		this.idArtistToDelete = idArtist;
		this.modalRef = this.modalService.show(template);
    }

    confirm(){
        if(this.idArtistToDelete){
            this._artistService.deleteArtist(this.token, this.idArtistToDelete).subscribe(
                response => {
                    if(response.artist){
                        this._messageService.sendMessage("Artist successfully removed","success");
                    }else{
                        this._messageService.sendMessage(response.message,"danger");
                    }
                    this.getArtist();
                    
                },
                error => {
                    console.log(error);
                }
            )
        }
        this.modalRef.hide();
    }
    
    decline(){
		this.idArtistToDelete = null;
		this.modalRef.hide();
	}

    getArtist(){
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

            this._artistService.getArtists(this.token, page).subscribe(
                response => {
                    if(response.artists){
                        this.artists = response.artists.docs;
                    }else{
                        this._messageService.sendMessage(response.message,'danger');
                    }
                },
                error => {
                    console.log(error);
                }
            )

        })
    }
}