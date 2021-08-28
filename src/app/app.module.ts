import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// @ts-ignore
import Amplify, { Hub } from 'aws-amplify';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { QuillModule } from 'ngx-quill';
import { ConfigService } from 'src/services/config/config.service';
import { InitService } from 'src/services/init/init.service';
import { AuthGuard } from '../guard/AuthGuard';
import { AuthService } from '../services/interceptor/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CasinoComponent } from './casino/casino.component';
import { BetDialogComponent } from './dialogs/betDialog/bet-dialog.component';
import { SmartContractDialogComponent } from './dialogs/smartContractDialog/smart-contract-dialog.component';
import { GithubComponent } from './github/github.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material/material.module';
import { MeComponent } from './me/me.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HomeComponent,
    MeComponent,
    GithubComponent,
    UnauthorizedComponent,
    CasinoComponent,
    SmartContractDialogComponent,
    BetDialogComponent,
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
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: getUseFactory,
      deps: [InitService, ConfigService],
      multi: true,
    },
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

export function getUseFactory(
  appInitService: InitService,
  config: ConfigService
) {
  return () => {
    const amplifyConfig = config.getConfig('Auth');
    Hub.listen('auth', ({ payload: { event, data, message } }) => {
      appInitService.handleEvents(event);
    });
    Amplify.configure({
      Auth: amplifyConfig,
    });
  };
}
