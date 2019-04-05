import { Component, OnInit } from '@angular/core';
import { Artist } from '../models/artist';
import { ArtistService } from "../artist/artist.service";
import { UserService } from "../user/user.service";
import { GLOBAL } from 'src/global';
import { Album } from '../models/album';
import { AlbumService } from '../album/album.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ArtistService,UserService,AlbumService]
})
export class HomeComponent implements OnInit {
	public artists: Artist[];
	public lastAlbums : Album[];
	public token: string;
	public nextPage :string;
	public prePage : string;
	public pageDefault: string;
	public url: string;

  	constructor(
		private _artistService: ArtistService,
		private _userService: UserService,
		private _albumService: AlbumService
	) { 
		this.pageDefault = "1";
		this.token = this._userService.getTokenInLocalStorage();
		this.url = GLOBAL.url;
	}

	ngOnInit() {
		this.getArtists(this.pageDefault);
		this.getLastAlbums();
	}

	getArtists(page:string){
		this._artistService.getArtists(this.token,page).subscribe(
			response => {
				if(response.artists){
					this.artists = response.artists.docs;
				}
			},
			error => {
				console.log(error);
			}
		)
	}

	getLastAlbums(){
		this._albumService.getLastAlbums(this.token,"4").subscribe(
			response => {
				if(response.album){
					this.lastAlbums = response.album;
				}
			},
			error => {
				console.log(error);
			}
		)
	}

}
