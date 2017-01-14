import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SequenceListComponent } from './sequence-list/sequence-list.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import {AuthenticationService} from "./_services/authentication.service";
import {AuthGuard} from "./_guards/auth-guard";
import {SequenceListService} from "./_services/sequence-list.service";
import { PopupComponent } from './popup/popup.component';
import {SequenceService} from "./_services/sequence.service";


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '',      component: SequenceListComponent, canActivate: [AuthGuard] },
  { path: '**',    redirectTo: ''}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SequenceListComponent,
    HeaderComponent,
    PopupComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,

  ],
  providers: [
    AuthenticationService,
    AuthGuard,
    SequenceListService,
    SequenceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
