import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { Album } from "../../models/album";
import { User } from "../../models/user";
import { UserService } from "../../user/user.service";
import { AlbumService } from "../album.service";
import { MessageService } from "../../messages/message.service";

@Component({
    selector: 'album-create',
    templateUrl: './album-create.component.html',
    providers : [ UserService,AlbumService,MessageService ]
})

export class AlbumCreateComponent implements OnInit {
    public album : Album;
    public token : string;
    public user: string;
    public title: string;
    public albumImg: any;
    public artistId: string;

    constructor(
        private _albumService: AlbumService,
        private _userService: UserService,
        private _messageService: MessageService,
        private _route: ActivatedRoute,
        private _router: Router
    ){
        this.token = _userService.getTokenInLocalStorage();
        this.user = _userService.getUserLogged();
        this.title = 'Create Album';
        this.albumImg = 'assets/images/default-user-image.png';
        this.album = new Album('','',1900,'','');
        this.artistId = this._route.snapshot.params.idArtist;
    }

    ngOnInit(){
        console.log(this.artistId);
    }

    onSubmit(){
        //this._route.params.forEach((param : Params) => {
            this.album.artist = this.artistId;
            this._albumService.saveAlbum(this.token,this.album).subscribe(
                response => {
                    if(!response.album){
                        this._messageService.sendMessage(response.album, 'danger');
                    }else{
                        this._router.navigate(['dashboard/albums/'+this.artistId]);
                    }
                },
                error => {
                    console.log(error);
                }
            )
        //})
    }
}