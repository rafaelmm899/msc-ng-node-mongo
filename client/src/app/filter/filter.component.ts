import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Params } from "@angular/router";


import { Song } from 'src/app/models/song';
import { SongService } from 'src/app/song/song.service';
import { UserService } from 'src/app/user/user.service';
import { GLOBAL } from 'src/global';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
	providers: [SongService,UserService]
})
export class FilterComponent implements OnInit {

  	public genre:string;
	public songs: Song[];
	public token: string;
	public nextPage;
  	public prePage;
	public url: string;

	constructor(
		private _route: ActivatedRoute,
		//private _router: Route,
		private _songService: SongService,
		private _userService: UserService
	) { 
		this.genre =  this._route.snapshot.params.gender.toUpperCase();
		this.token = this._userService.getTokenInLocalStorage();
		this.url = GLOBAL.url;
	}

	ngOnInit() {
		
		this.getSongsByGender();
	}

	getSongsByGender(){
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
			
			this._songService.getSongsByGenre(this.token,this.genre,page).subscribe(
				response => {
					if(response.songs){
						this.songs = response.songs.docs;
					}
				},
				error => {
					console.log(error);
				}
			)
		})
		
	}

}
