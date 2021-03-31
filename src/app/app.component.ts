import { Component, OnInit } from '@angular/core'; 
import { AuthenticationService } from 'src/services/auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private auth: AuthenticationService) {
     
  }

  async ngOnInit() {
    this.signIn();
  }

  async signIn() {
    const isAuthenticated = await this.auth.isAuthenticated().toPromise();
    if(isAuthenticated) {
      this.isAuthenticated = true;
    } else {
      const result = await this.auth.signIn(); 
      if(result) this.isAuthenticated = true;
      else this.isAuthenticated = false;
    }
  }
}
