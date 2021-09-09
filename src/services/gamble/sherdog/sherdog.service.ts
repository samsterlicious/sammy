import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { mergeMap, shareReplay } from 'rxjs/operators';
import { ConfigService } from 'src/services/config/config.service';

@Injectable({
  providedIn: 'root',
})
export class SherdogService {
  events$: Observable<BetEvent[]>;
  event = new Subject<string>();
  fights$: Observable<Fights[]>;
  baseUrl;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.baseUrl = this.config.getConfig('API_URL');
    this.events$ = this.getEvents();
    this.fights$ = this.event
      .asObservable()
      .pipe(mergeMap((eventName) => this.getFighters(eventName)));
  }

  getEvents() {
    return this.http
      .get<BetEvent[]>(`${this.baseUrl}/sherdog`)
      .pipe(shareReplay(1));
  }

  getFighters(eventName: string) {
    return this.http.get<Fights[]>(
      `${this.baseUrl}/sherdog?event=${eventName}`
    );
  }

  eventSelectedAction(eventLink: string) {
    this.event.next(eventLink);
  }
}

export interface BetEvent {
  name: string;
  link: string;
  date: Date;
}

export interface Fights {
  secondFighter: string;
  firstFighter: string;
}
