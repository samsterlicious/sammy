import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class InitService {
  private isFaileRedirect = false;
  constructor(private router: Router) {}

  handleEvents(event: string) {
    switch (event) {
      case 'signIn_failure':
        this.isFaileRedirect = true;
        this.router.navigate(['']);
    }
  }

  didRedirectAndFailt() {
    return this.isFaileRedirect;
  }
}
