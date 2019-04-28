import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from "./breadcrumb.service";

@Component({
  	selector: 'app-breadcrumb',
  	templateUrl: './breadcrumb.component.html',
  	styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
	item: any = {};
	subscription: Subscription;
	public items: any[];

	constructor(
		private _breadcrumbService: BreadcrumbService
	) { 
		this.subscription = this._breadcrumbService.get().subscribe(items => { this.add(items.text,items.link) });
		this.items = [];
	}

	ngOnInit() {
	}

	add(text:string, link:string){
		this.items.push({
			link: link,
			text: text
	  });
	}

}
