import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ArtistService } from '../artist.service';
import { AlbumService } from 'src/app/album/album.service';
import { SongService } from 'src/app/song/song.service';
import { Artist } from 'src/app/models/artist';
import { Album } from 'src/app/models/album';
import { Song } from 'src/app/models/song';
import { UserService } from 'src/app/user/user.service';
import { GLOBAL } from 'src/global';

@Component({
  	selector: 'app-artist-detail',
  	templateUrl: './artist-detail.component.html',
	styleUrls: ['./artist-detail.component.css'],
	providers: [ ArtistService, AlbumService, SongService, UserService ]  
})
export class ArtistDetailComponent implements OnInit {
	public artist: Artist;
	public albums: Album[];
	public songs: Song[];
	public token: string;
	public url: string;
	public songSectionShow: boolean;
	public albumSelected: string;

  	constructor(
		private _artistService: ArtistService,
		private _albumService: AlbumService,
		private _songService: SongService,
		private _router: Router,
		private _route: ActivatedRoute,
		private _userService: UserService
	) { 
		this.token = this._userService.getTokenInLocalStorage();
		this.url = GLOBAL.url;
	}

  	ngOnInit() {
		let idArtist = this._route.snapshot.paramMap.get("idArtist");
		
		this.getArtist(idArtist);
		
	}

	getSongs(idAlbum:string){
		this.albumSelected = idAlbum;
		this._songService.getSongs(this.token,idAlbum).subscribe(
			songResponse => {
				if(songResponse.song){
					this.songs = songResponse.song;
				}
			},
			songError => {
				console.log(songError);
			}
		)
	}

	getAlbums(idArtist: string){
		this._albumService.getAlbums(this.token,idArtist,"1").subscribe(
			res => {
				if(res.album){
					this.albums = res.album.docs;
					if(this.albums.length > 0){
						this.albumSelected = this._route.snapshot.paramMap.get("idAlbum");
						
						if(!this.albumSelected){
							this.albumSelected = this.albums[0]._id;
						}

						this.getSongs(this.albumSelected);
						this.songSectionShow = true;
						
					}else{
						this.songSectionShow = false;
					}
				}
			},
			err => {
				console.log(err);
			}
		)
	}
	  
	getArtist(idArtist: string){
		this._artistService.getArtist(this.token,idArtist).subscribe(
			response => {
				if(response.artist){
					this.artist = response.artist;
					this.getAlbums(this.artist._id);
				}
			},
			error => {
				console.log(error);
			}
		)
	}


}
