import { Component, OnInit, DoCheck,ViewChild,Renderer2, ElementRef } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../user/user.service';
import { GLOBAL } from 'src/global';
import { Router,ActivatedRoute } from "@angular/router";

import { Subscription } from "rxjs";
import { Song } from '../models/song';
 

@Component({
  	selector: 'app-dashboard',
  	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css'],
	providers: [UserService]

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
	

	constructor(
		private _userService: UserService,
		private _route: ActivatedRoute,
		private _router: Router,
		private el: ElementRef,
		private renderer: Renderer2
	) {  
		this.userLogged = _userService.getUserLogged();
		this.token = _userService.getTokenInLocalStorage();
		this.url = GLOBAL.url;
		this.profileImage = 'assets/images/default-user-image.png'
		this.song = new Song("","",1,"","","","");
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
		console.log(this.el.nativeElement.querySelector("audio"));
  	}

	updatePlayer(song: any){
		let filePath = this.url+'get-song/'+song.file;
		
		this.renderer.setAttribute(this.el.nativeElement.querySelector("source"),"src",filePath);
		this.el.nativeElement.querySelector("audio").load();
		this.el.nativeElement.querySelector("audio").play();

		//let reproductor = document.getElementById("source");
		//(document.getElementById("player") as any).load();
		//(document.getElementById("player") as any).play();

		//document.getElementById("play-song-title").innerHTML = song.name;
		//document.getElementById("play-song-artist").innerHTML = song.album.artist.name;
	}

	onActivate(componentReference) {
		console.log(componentReference)
		//componentReference.anyFunction();
		//Below will subscribe to the searchItem emitter
		if(componentReference.play){
			componentReference.play.subscribe((song) => {
			
				this.song = song;
				this.updatePlayer(song);
				//document.getElementById("play-image-album").setAttribute("src", imagePath);
				console.log(song);
			})
		}
	}

}
