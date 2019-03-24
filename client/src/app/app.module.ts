import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { DashboardModule } from "./dashboard/dashboard.module";

import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';

import { AppRouting } from './app.routing';

/* user */
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';

/* Artist */
import { ArtistListComponent } from './artist/artist-list/artist-list.component';
import { ArtistCreateComponent } from "./artist/artist-create/artist-create.component";
import { ArtistEditComponent } from './artist/artist-edit/artist-edit.component';

/* Album */
import { AlbumListComponent } from "./album/album-list/album-list.component";
import { AlbumCreateComponent } from "./album/album-create/album-create.component";

/* Message */
import { MessagesComponent } from './messages/messages.component';

/* ngx-bootstrap */
import { ModalModule, AlertModule, ButtonsModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';



@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    UserCreateComponent,
    UserListComponent,
    UserEditComponent,
    MessagesComponent,
    UserDetailComponent,
    ArtistListComponent,
    ArtistCreateComponent,
    ArtistEditComponent,
    AlbumListComponent,
    AlbumCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRouting,
    DashboardModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
