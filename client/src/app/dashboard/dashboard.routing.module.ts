import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from '../home/home.component';
import { UserListComponent } from '../user/user-list/user-list.component';
import { UserEditComponent } from '../user/user-edit/user-edit.component';
import { UserDetailComponent } from '../user/user-detail/user-detail.component';
import { UserCreateComponent } from '../user/user-create/user-create.component';
import { ArtistListComponent } from '../artist/artist-list/artist-list.component';
import { ArtistCreateComponent } from '../artist/artist-create/artist-create.component';
import { ArtistEditComponent } from '../artist/artist-edit/artist-edit.component';
import { AlbumListComponent } from '../album/album-list/album-list.component';
import { AlbumCreateComponent } from '../album/album-create/album-create.component';
import { AlbumEditComponent } from '../album/album-edit/album-edit.component';
import { SongListComponent } from '../song/song-list/song-list.component';
import { SongCreateComponent } from '../song/song-create/song-create.component';
import { SongEditComponent } from '../song/song-edit/song-edit.component';
import { ArtistDetailComponent } from '../artist/artist-detail/artist-detail.component';
import { ExploreComponent } from '../explore/explore.component';
import { FilterComponent } from '../filter/filter.component';



const dashboardRoutes : Routes = [{
	path : 'dashboard',
	component : DashboardComponent,
	children : [
		{ path : 'home',component : HomeComponent },
		{ path : 'home/:page',component : HomeComponent },
		{ path: 'user-list', component : UserListComponent },
		{ path: 'user-edit/:id', component: UserEditComponent },
		{ path: 'profile', component: UserDetailComponent },
		{ path: 'user-create', component : UserCreateComponent },
		{ path: 'artists', component:ArtistListComponent  },
		{ path: 'artist/:id', component:ArtistEditComponent  },
		{ path: 'artist-create', component: ArtistCreateComponent },
		{ path: 'albums/:id', component: AlbumListComponent },
		{ path: 'album-create/:idArtist', component: AlbumCreateComponent },
		{ path: 'album-edit/:id', component: AlbumEditComponent },
		{ path: 'songs/:id', component: SongListComponent },
		{ path:'song-create/:albumId', component: SongCreateComponent },
		{ path: 'song-edit/:albumId/:songId', component:SongEditComponent },
		{ path: 'artist-detail/:idArtist', component : ArtistDetailComponent },
		{ path: 'artist-detail/:idArtist/:idAlbum', component : ArtistDetailComponent },
		{ path: 'explore', component: ExploreComponent },
		{ path : 'explore/:gender',component : FilterComponent },
		{ path : 'explore/:gender/:page',component : FilterComponent }
	]
	
}]

@NgModule({
  	declarations: [],
  	imports: [
		RouterModule.forChild(dashboardRoutes),
    	CommonModule
	  ],
	  exports:[
		  RouterModule
	  ]
})
export class Dashboard { }
