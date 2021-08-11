import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 
// @ts-ignore
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from '../services/interceptor/auth.service';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './home/home.component';
import { MeComponent } from './me/me.component';
import { GithubComponent } from './github/github.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { AuthGuard } from '../guard/AuthGuard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { QuillModule } from 'ngx-quill';
import { AccountabilityComponent } from './accountability/accountability.component';
import { CasinoComponent } from './casino/casino/casino.component'; 

Amplify.configure(awsconfig);
@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HomeComponent,
    MeComponent,
    GithubComponent, 
    UnauthorizedComponent,
    AccountabilityComponent,
    CasinoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule, 
    AppRoutingModule,
    PdfViewerModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    QuillModule.forRoot(), 
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthService,
      multi: true,
    },
    { provide: Window, useValue: window },
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
