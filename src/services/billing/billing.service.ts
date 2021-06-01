import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import API from '@aws-amplify/api';
import { Auth } from 'aws-amplify';
import { AmplifyService } from 'aws-amplify-angular';
import { Observable, from } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class BillingService {
  constructor(private http: HttpClient) {}

  getBudget(year: string, month: string): Observable<Budget> { 
    return this.http.get<Budget>(`https://api.sammy.link/budget?year=${year}&month=${month}`)
  }
}

export interface Budget {
  url: string;
}
