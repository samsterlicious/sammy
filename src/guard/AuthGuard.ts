import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from '../services/auth/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _router: Router, private _auth: AuthenticationService) {}

  canActivate() {
    return this._auth.isAuthenticated().pipe(
      tap((resp) => {
        if (!resp) {
          this._router.navigate(['unauthorized']);
        }
      })
    );
  }
}
