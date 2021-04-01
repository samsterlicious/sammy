import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthenticationService) {}

  async ngOnInit() {}
}
