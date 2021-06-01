import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { addListener } from 'node:process';
import { AuthenticationService } from 'src/services/auth/authentication.service';
import { ChatService } from 'src/services/chat/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private chatService: ChatService
  ) {
    this.socket = new WebSocket(
      'wss://80qmqvf5o8.execute-api.us-east-1.amazonaws.com/prod'
    );
  }

  messages: Message[] = [];
  name: string = '';
  socket: WebSocket;

  @ViewChild('quillRef') quillRef: any;

  bindings = {
    enter: {
      key: 13,
      shiftKey: false,
      ctrlKey: false,
      handler: () => {
        this.submit();
      },
    },
  };

  ngOnInit(): void {
    this.authService.getCurrentSession().subscribe((info) => {
      this.name = info.getIdToken().payload.name;
    });

    this.chatService.loadMessages().subscribe((messages) => {
      this.messages = messages;
    });
  }

  submit() {
    const message: Message = {
      user: this.name,
      date: new Date().toISOString(),
      text: String(this.quill.value).replace(/(\n)+$/, ''),
    };
    this.chatService.sendMessage(message).subscribe((resp) => {
      console.log('resp', resp);
    });
    this.quill.setValue('');
  }

  quill = new FormControl('');
}

export interface Message {
  user: string;
  date: string;
  text: string;
}
