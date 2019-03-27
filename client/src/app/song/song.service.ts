import { Injectable } from "@angular/core";
import { GLOBAL } from 'src/global';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Song } from '../models/song';
import { Observable } from 'rxjs';

@Injectable()

export class SongService {
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = GLOBAL.url
    }

    save(token: string, song: Song):Observable<any>{
        let param = JSON.stringify(song);
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : token
        })

        return this._http.post(this.url+'song',param,{headers : headers});
    }

    getSongs(token: string,albumId: string, page:string):Observable<any>{
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : token
        })
        return this._http.get(this.url+'songs/'+albumId+'/'+page, { headers: headers });
    }

}