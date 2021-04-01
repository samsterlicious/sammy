import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/auth/authentication.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  loggedIn: boolean;

  constructor(private authService: AuthenticationService) {
    this.loggedIn = false;
  }

  signIn() {
    this.authService.signIn().subscribe();
  }

  async signOut() {
    const ret = await this.authService.signOut()
    console.log("ret",ret)
  }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((val) => {
      this.loggedIn = val;
    });
    // this.authService.getCurrentSession().subscribe(info=>{
    //   console.log('info',info)
    // })
  }
}
