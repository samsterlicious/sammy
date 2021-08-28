import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '@aws-amplify/auth';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements HttpInterceptor {
  constructor(private config: ConfigService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(
      Auth.currentSession().catch((err) => {
        return '';
      })
    ).pipe(
      switchMap((session: any) => {
        if (session) {
          const modifiedHeader = req.clone({
            headers: req.headers.append(
              'Authorization',
              session.getAccessToken().getJwtToken()
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
