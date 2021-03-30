import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Auth } from '@aws-amplify/auth';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     return from(Auth.currentSession())
      .pipe(
        switchMap(session => {
          console.log(session.getIdToken().getJwtToken())
          console.log('session',session.getAccessToken().getJwtToken())
          const modifiedHeader = req.clone({
            headers: req.headers.append('Authorization', session.getIdToken().getJwtToken())
          })
          return next.handle(modifiedHeader);
        })
      ) 
    // console.log('req',req)
    //   return next.handle(req);
      
  }
}
