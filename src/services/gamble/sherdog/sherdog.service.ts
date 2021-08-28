import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { ConfigService } from 'src/services/config/config.service';

@Injectable({
  providedIn: 'root',
})
export class SherdogService {
  events$: Observable<BetEvent[]>;
  baseUrl;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.baseUrl = this.config.getConfig('API_URL');
    this.events$ = this.getEvents();
  }

  getEvents() {
    return this.http
      .get<BetEvent[]>(`${this.baseUrl}/sherdog`)
      .pipe(shareReplay(1));
  }
}

interface BetEvent {
  name: string;
  link: string;
  date: Date;
}
