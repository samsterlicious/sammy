import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/auth/authentication.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  name: string = '';
  isLoggedIn$ = this.authService.isAuthenticated();
  constructor(private authService: AuthenticationService) {
    // this.loggedIn$ = authService.loggedIn$;
  }

  signIn() {
    this.authService.signIn().subscribe();
  }

  async signOut() {
    const ret = await this.authService.signOut();
  }

  ngOnInit(): void {
    this.authService.getCurrentSession().subscribe((info) => {
      this.name = info.getIdToken().payload.name;
    });
  }
}
