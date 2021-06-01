import { HttpClient } from '@angular/common/http';
import { Message } from 'src/app/chat/chat.component';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}

  sendMessage(message: Message): Observable<SendResponse> {
    return this.http.post<SendResponse>(`https://api.sammy.link/chat`, message);
  }

  loadMessages(): Observable<Message[]> {
    return of([
      {
        user: 'sam greene',
        date: new Date().toISOString(),
        text: 'this is a test',
      },
    ]);
  }
}

interface SendResponse {
  message: string;
}
