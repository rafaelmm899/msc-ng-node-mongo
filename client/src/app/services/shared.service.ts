import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable()
export class SharedService {
    // Observable string sources
    public emitChangeSource = new Subject<any>();
    // Observable string streams
    //changeEmitted$ = this.emitChangeSource.asObservable();
    // Service message commands
    emitChange(change: any) {
        this.emitChangeSource.next(change);
        console.log(change);
    }

    getChange():Observable<any>{
        return this.emitChangeSource;
    }
}