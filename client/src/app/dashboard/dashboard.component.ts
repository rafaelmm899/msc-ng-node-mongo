import { Component, OnInit, DoCheck,ViewChild,Renderer2, ElementRef } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../user/user.service';
import { GLOBAL } from 'src/global';
import { Router,ActivatedRoute } from "@angular/router";

import { Subscription } from "rxjs";
import { Song } from '../models/song';
import { AlbumService } from '../album/album.service';
import { SongService } from '../song/song.service';
 

@Component({
  	selector: 'app-dashboard',
  	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css'],
	providers: [UserService, AlbumService, SongService]

})
export class DashboardComponent implements OnInit, DoCheck {
	//@ViewChild('#player') playerElement: ElementRef;
	public subscription: Subscription;
	public items: string[];
	public userLogged;
	public url;
	public profileImage;
	public token: string;
	public song: Song;
	public fullSideBar: boolean;
	public playing: boolean;

	constructor(
		private _userService: UserService,
		private _route: ActivatedRoute,
		private _router: Router,
		private el: ElementRef,
		private renderer: Renderer2,
		private _albumService: AlbumService,
		private _songService: SongService
	) {  
		this.userLogged = _userService.getUserLogged();
		this.token = _userService.getTokenInLocalStorage();
		this.url = GLOBAL.url;
		this.profileImage = 'assets/images/default-user-image.png'
		this.song = new Song("","",1,"","","","");
		this.fullSideBar = true;
		this.playing = false;
	}

	ngDoCheck(){
		let currentUser = this._userService.getUserLogged();
		let token = this._userService.getTokenInLocalStorage();

		if(token != this.token){
			this.logout();
		}
	}

	ngOnInit() {
		
		this.checkImageUser();
	}

	checkImageUser(){
		if(this.userLogged.image){
			this.profileImage = this.url+'user/get_image_profile/'+this.userLogged.image;
		}
	}

	onHidden(): void {
		console.log('Dropdown is hidden');
	}

	onShown(): void {
		console.log('Dropdown is shown');
	}

	isOpenChange(): void {
		console.log('Dropdown state is changed');
	}

	logout(){
		this._userService.logout();
		this._router.navigate(['']);
	}

	ngAfterViewInit() {
		
  	}


	songFinished(): void{
		this.playing = false;
		if(this.song && this.userLogged){
			this._songService.playback(this.token,this.userLogged,this.song).subscribe(
				response => {
						
				},
				error => {
					console.log(error);
				}
			)
		}
		
	}

	updatePlayer(song: any){
		this._albumService.getAlbum(this.token,song.album).subscribe(
			response => {
				if(response.album){
					this.song.album = response.album;
					let filePath = this.url+'get_song/'+song.file;
					let imagePath = this.url+'album_get_image/'+response.album.image;
					console.log(imagePath);
					this.renderer.setAttribute(this.el.nativeElement.querySelector("source"),"src",filePath);
					
					this.renderer.setAttribute(this.el.nativeElement.querySelector("#play-image-album"),"src",imagePath);
					this.el.nativeElement.querySelector("audio").load();
					this.el.nativeElement.querySelector("audio").play();
				}
			},
			error => {
				console.log(error);
			}
		)
	}

	onActivate(componentReference) {
		console.log(componentReference)
		if(componentReference.play){
			componentReference.play.subscribe((song) => {
				this.playing = true;
				this.song = song;
				this.updatePlayer(song);
				console.log(song);
			})
		}
	}

	showMenu(){
		if(this.fullSideBar){
			this.fullSideBar = false;
		}else{
			this.fullSideBar = true;
		}
		
		console.log(this.fullSideBar);
	}

	playSong(){
		this.playing = true;
		this.el.nativeElement.querySelector("audio").play();
	}

	stopSong(){
		this.playing = false;
		this.el.nativeElement.querySelector("audio").pause();
	}

}
