import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core'; 
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer, 
    public router: Router
  ) {  
    this.matIconRegistry.addSvgIcon(
      'github',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/images/github.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'linkedin',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/images/linkedin.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'gmail',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/images/gmail.svg'
      )
    );
  }

  navOpened: boolean = true;

  close() {
    this.navOpened = false;
  }

  open() {
    this.navOpened = true;
  }

  async ngOnInit() {}
}
