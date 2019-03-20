import { Component, OnInit } from '@angular/core';
import { MessageService } from "./message.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  providers: [MessageService]
})
export class MessagesComponent implements OnInit {
	public messages;

	constructor(
		private _messageService: MessageService
	) { }

	ngOnInit() {
		this.messages = this._messageService.messages;
	}

}
