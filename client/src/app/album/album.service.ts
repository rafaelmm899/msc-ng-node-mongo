import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from 'src/global';
import { Observable } from 'rxjs';
import { Album } from '../models/album';

@Injectable({
    providedIn: 'root',
})
export class AlbumService {
    public url:string;

    constructor(
        private _http: HttpClient
    ){
        this.url = GLOBAL.url;
    }

    getAlbums(token: string, artistId: string, page: string):Observable<any>{
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : token
        })
        return this._http.get(this.url+'albums/'+artistId+'/'+page,{ headers: headers });
    }

    saveAlbum(token: string, albumParams: Album):Observable<any>{
        let album = JSON.stringify(albumParams);
        
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : token
        })
        return this._http.post(this.url+'album',album,{ headers : headers });
    }

}
