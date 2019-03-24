import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { Album } from "../../models/album";
import { User } from "../../models/user";
import { UserService } from "../../user/user.service";
import { AlbumService } from "../album.service";
import { MessageService } from "../../messages/message.service";

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

    constructor(
        private _userService: UserService,
        private _albumService: AlbumService,
        private _router: Router,
        private _route : ActivatedRoute,
        private _messageService: MessageService
    ){
        this.token = _userService.getTokenInLocalStorage();
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

}