import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { GLOBAL } from '../../global';
import { User } from '../models/user';

@Injectable()

export class UserService {
    public url: string;
    public token;

    constructor(
        private _http: HttpClient
    ) { 
        this.url = GLOBAL.url;
    }

    login(user: User):Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'login', params ,{headers : headers}).pipe(map(user => {

            return user;
        }));
    }

    getToken(user):Observable<any>{
        user.getToken = true;
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'login', params ,{headers : headers}).pipe(map(res => res));
    }

    getTokenInLocalStorage(){
        let token = localStorage.getItem("token");

        if(token != undefined){
            this.token = token;
        }else{
            this.token = null;
        }

        return this.token;
    }

    newUser(user: User):Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'user/create_user', params, { headers : headers }).pipe(map(user => {

            return user;
        }));
    }

}