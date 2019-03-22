import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }    from '@angular/common/http';
import { GLOBAL } from 'src/global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
    public url: string;

    constructor(
        private _http: HttpClient
    ) {

        this.url = GLOBAL.url;
    }

    getArtists(token: string, page: string) :Observable<any>{ 
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : token
        })

        return this._http.get(this.url+'artists/'+page, { headers: headers });
    }

}