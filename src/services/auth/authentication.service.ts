import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { Auth } from 'aws-amplify';
import { catchError, map } from 'rxjs/operators';
import { ICredentials } from '@aws-amplify/core';
import { CognitoUserSession } from 'amazon-cognito-identity-js'; 

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public loggedIn: BehaviorSubject<boolean>;

  constructor() { 
    this.loggedIn = new BehaviorSubject<boolean>(false);
  }

  async checkCredentials() {
    const isAuthenticated = await this.isAuthenticated().toPromise();
  }

  getCurrentSession(): Observable<CognitoUserSession> {
    return from(Auth.currentSession());
  }

  isAuthenticated(): Observable<boolean> {
    return from(Auth.currentAuthenticatedUser()).pipe(
      map((result: any) => { 
        this.loggedIn.next(true);
        return true;
      }),
      catchError((error: any) => {  
        return of(false);
      })
    );
  }

  signOut():Observable<any> {   
    return from(Auth.signOut())
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
