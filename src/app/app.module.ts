import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { AmplifyService } from 'aws-amplify-angular';
// @ts-ignore
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';
import { BillingComponent } from './billing/billing.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from '../services/interceptor/auth.service';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { ConsoleComponent } from './console/console.component';

Amplify.configure(awsconfig);
@NgModule({
  declarations: [AppComponent, BillingComponent, ToolbarComponent, ConsoleComponent],
  imports: [
    AmplifyUIAngularModule,
    BrowserModule,
    MatIconModule,
    MatToolbarModule,
    MatGridListModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
