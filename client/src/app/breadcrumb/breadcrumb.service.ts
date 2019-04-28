import { Injectable } from '@angular/core';
import { Observable,Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
	public subject = new Subject<any>();

	constructor() { }
	  
	add(text:string, link:string){
		this.subject.next({ text: text, link:link });
		console.log(this.subject);
	}

	clear() {
		this.subject.next();
	}

	get(): Observable<any> {
		return this.subject.asObservable();
	}

}
