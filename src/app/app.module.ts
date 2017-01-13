import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SequenceListComponent } from './sequence-list/sequence-list.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import {AuthenticationService} from "./_services/authentication.service";

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '',      component: SequenceListComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SequenceListComponent,
    HeaderComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
