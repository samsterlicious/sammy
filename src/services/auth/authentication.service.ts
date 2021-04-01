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
        console.log("swig")
        this.loggedIn.next(true);
        return true;
      }),
      catchError((error: any) => {
        console.log("swag")
        // this.loggedIn.next(false);
        return of(false);
      })
    );
  }

  async signOut():Promise<any> {  
    await Auth.signOut({global: true}).then(resp=>{
      console.log("signed out!")
    }).catch(err=>{ 
      console.log("ohhhhh")
    });
    return "good"
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
