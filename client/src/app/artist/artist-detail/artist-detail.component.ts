import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ArtistService } from '../artist.service';
import { AlbumService } from 'src/app/album/album.service';
import { SongService } from 'src/app/song/song.service';
import { Artist } from 'src/app/models/artist';
import { Album } from 'src/app/models/album';
import { Song } from 'src/app/models/song';
import { UserService } from 'src/app/user/user.service';

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

  	constructor(
		private _artistService: ArtistService,
		private _albumService: AlbumService,
		private _songService: SongService,
		private _router: Router,
		private _route: ActivatedRoute,
		private _userService: UserService
	) { 

	}

  	ngOnInit() {
	}
	  



}
