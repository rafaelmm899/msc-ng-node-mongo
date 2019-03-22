import { Component, OnInit } from "@angular/core";

import { ArtistService } from "../artist.service";
import { User } from "../../models/user";
import { Artist } from "../../models/artist";
import { MessageService } from '../../messages/message.service';
import { UserService } from "../../user/user.service";

@Component({
    selector : 'artist-create',
    templateUrl : './artist-create.component.html',
    providers: [ArtistService, MessageService, UserService]
})

export class ArtistCreateComponent implements OnInit {
    public artist : Artist;
    public token : string;
    public title: string;
    public artistImg: string;

    constructor(
        private _artistService: ArtistService,
        private _userService: UserService,
        private _messageService: MessageService
    ){
        this.title = 'Create Artist';
        this.artist = new Artist('','','','');
        this.token = this._userService.getTokenInLocalStorage();
        this.artistImg = 'assets/images/default-user-image.png';
    }

    ngOnInit(){

    }

    onSubmit(){
        this._artistService.saveArtist(this.token, this.artist).subscribe(
            response => {
                if(!response.artist){
                    this._messageService.sendMessage(response.message, 'danger');
                }else{
                    this.artist = response.artist
                    this._messageService.sendMessage('Artist created successfully', 'success');
                }
            },
            error => {
                console.log(error);
            }
        )
    }

}