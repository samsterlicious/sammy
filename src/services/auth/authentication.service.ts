import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { Auth } from 'aws-amplify'
import { catchError, map } from 'rxjs/operators'; 
import { ICredentials } from '@aws-amplify/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public loggedIn: BehaviorSubject<boolean>;

  constructor() { 
    this.loggedIn = new BehaviorSubject<boolean>(false);
  }

  async checkCredentials() {
    const isAuthenticated = await this.isAuthenticated().toPromise();
  }

  isAuthenticated(): Observable<boolean> {
    return from(Auth.currentAuthenticatedUser())
    .pipe(
      map((result:any) => {
        this.loggedIn.next(true);
        return true;
      }),
      catchError((error:any) => {
        this.loggedIn.next(false);
        return of(false);
      })
    )
  }

  async signIn(): Promise<ICredentials | null > {
    try {
      console.log('Calling signing in');
      const result = await Auth.federatedSignIn({
        customProvider: 'auth0'
      });
      this.loggedIn.next(true);
      return result
    } catch (error) {
      console.log('error',error)
      this.loggedIn.next(false)
      return null
    }
  }
}
