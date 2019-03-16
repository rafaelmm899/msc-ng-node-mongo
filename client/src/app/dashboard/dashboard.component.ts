import { Component, OnInit } from '@angular/core';


 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	public items: string[];

	constructor() {  
		this.items = [
			'The first choice!',
			'And another choice for you.',
			'but wait! A third!'
		];
	}

	ngOnInit() {
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

}
