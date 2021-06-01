import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/guard/AuthGuard';
import { AccountabilityComponent } from './accountability/accountability.component';
import { BillingComponent } from './billing/billing.component';
import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home/home.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cost', component: BillingComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
  { path: 'accountability', component: AccountabilityComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
