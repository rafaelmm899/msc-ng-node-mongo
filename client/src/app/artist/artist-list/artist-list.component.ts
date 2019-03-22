import { Component, OnInit } from "@angular/core";
import { Route, Router, ActivatedRoute, Params } from '@angular/router';

import { Artist } from "../../models/artist";
import { ArtistService } from "../artist.service";
import { UserService } from '../../user/user.service';
import { MessageService } from "../../messages/message.service";

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


    constructor(
        private _artistService: ArtistService,
        private _userService: UserService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _messageService: MessageService
    ){
        this.token = this._userService.getTokenInLocalStorage();
    }

    ngOnInit(){
        this.getArtist();
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