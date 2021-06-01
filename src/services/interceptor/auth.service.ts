import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Auth } from '@aws-amplify/auth';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(Auth.currentSession().
    catch(err=>{
      return "";
    })).pipe(
      switchMap((session:any) => {
        if (session) {
          const modifiedHeader = req.clone({
            headers: req.headers.append(
              'Authorization',
              session.getIdToken().getJwtToken()
            ),
          });
          return next.handle(modifiedHeader);
        } else {
          return next.handle(req);
        }
      })
    );
  }
}
