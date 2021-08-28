import { Injectable } from '@angular/core';
import { ICredentials } from '@aws-amplify/core';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  public loggedIn$ = this.loggedIn.asObservable();

  private email = new BehaviorSubject<string>('');
  public email$ = this.email.asObservable();

  constructor() {}

  getCurrentSession(): Observable<CognitoUserSession> {
    return from(Auth.currentSession());
  }

  isAuthenticated(): Observable<boolean> {
    if (this.loggedIn.value) return of(true);
    return from(Auth.currentAuthenticatedUser()).pipe(
      map((result: any) => {
        this.loggedIn.next(true);
        if (this.email.value !== result.signInUserSession.idToken.payload.email)
          this.email.next(result.signInUserSession.idToken.payload.email);
        return true;
      }),
      catchError((error: any) => {
        return of(false);
      })
    );
  }

  signOut(): Observable<any> {
    this.loggedIn.next(false);
    this.email.next('');
    return from(Auth.signOut());
  }

  signIn(): Observable<ICredentials | null> {
    return from(
      Auth.federatedSignIn({
        customProvider: 'auth0',
      })
        .then((result) => {
          this.loggedIn.next(true);
          return result;
        })
        .catch((error) => {
          this.loggedIn.next(false);
          return null;
        })
    );
  }
}
